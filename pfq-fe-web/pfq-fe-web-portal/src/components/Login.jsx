import { useState } from "react";
import { exec } from "../../../../pfq-fe-native/src/utils/encryption";

export const Login = ({ setUsername }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const validUsers = ["admin"];
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "username") {
      setUsernameText(e.target.value);
    } else {
      setPasswordText(e.target.value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (passwordText) {
      const result = await exec(passwordText);
      if (result) {
        validUsers.includes(usernameText.toLowerCase())
          ? setUsername(usernameText)
          : setMessage("Invalid Username") 
      } else {
        setMessage("Incorrect Password");
        setTimeout(() => setMessage(""), 2000)
      }
    }
  };

  return (
    <div>
    {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={usernameText}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={passwordText}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
