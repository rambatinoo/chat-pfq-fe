// import { NativeModules } from 'react-native';
// import crypto from 'react-native-crypto';
import bcrypt from "react-native-bcrypt";

const saltRounds = 8;

// const setUpSecurePRNG = async () => {
//   if (NativeModules.RNRandomBytes) {
//     try {
//       const seed = await NativeModules.RNRandomBytes.seed();

//       crypto.randomBytes = size => {
//         const randomBytes = NativeModules.RNRandomBytes.randomBytes(size);
//         return Buffer.from(randomBytes, 'base64');
//       };

//       bcrypt.setRandomFallback(len => {
//         return crypto.randomBytes(len);
//       });

//       console.log("Secure PRNG set up successfully.");
//     } catch (err) {
//       console.error("Failed to seed random bytes:", err);
//     }
//   } else {
//     console.error("RNRandomBytes module not available");
//   }
// };

// setUpSecurePRNG();


export const hashPassword = (clientPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(clientPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

const checkPasswords = async (clientPassword, hashedPassword) => {
  try {
    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(clientPassword, hashedPassword, (err, isMatch) => {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const exec = async (userPassword, clientPassword) => {
  try {
    const result = await checkPasswords(clientPassword, userPassword);
    return result;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};
