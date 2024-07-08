import bcrypt from "bcryptjs";

const saltRounds = 8;

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
