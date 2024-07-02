import bcrypt from "react-native-bcrypt";
const saltRounds = 8;
const password = "password123";

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        console.log("HASHED");
        resolve(hashedPassword);
      }
    });
  });
};

const checkPasswords = (passwordInput, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordInput, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const exec = async (passwordInput) => {
  try {
    const hashedPassword = await hashPassword(password);
    const result = await checkPasswords(passwordInput, hashedPassword);
    return result;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
};
