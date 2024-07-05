import { useState } from "react";
import { exec } from "../../../../pfq-fe-native/src/utils/encryption";
import { getRequest } from "../../../../pfq-fe-native/src/utils/api";
import './Login-styles.css'


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

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (passwordText) {
  //     const result = await exec(passwordText);
  //     if (result) {
  //       validUsers.includes(usernameText.toLowerCase())
  //         ? setUsername(usernameText)
  //         : setMessage("Invalid Username") 
  //     } else {
  //       setMessage("Incorrect Password");
  //       setTimeout(() => setMessage(""), 2000)
  //     }
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault()
    if (usernameText && passwordText) {
      try {
        const user = await getRequest(`users/${usernameText.toLowerCase()}`)
        if (!user) {
          setMessage("User doesn't exist!")
          setTimeout(() => setMessage(""), 5000)
          return
        } 
        if (!user.isAdmin) {
          setMessage("User isn't an admin!")
          setTimeout(() => setMessage(""), 5000)
          return
        }
        const passwordCheck = await exec(user.password, passwordText)
        if (!passwordCheck) {
          setMessage("Incorrect password, please try again.")
          setTimeout(() => setMessage(""), 5000)
          return
        }
        setUsername(usernameText)
      } catch (err) {
        console.log("Error:", err)
        throw err
      }
    } else {
      setMessage("Missing fields!")
      setTimeout(() => setMessage(""), 5000)
    }
  }

  return (
    <div className='login'>
    <div className='login-container'>
    {message && <p className='login-message'>{message}</p>}
    <img src='../public/logo.png' style={{width: '300px'}}/>
    
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
      <p className='designtag'>
        Designed & built by: Liam, Matt, Jake & Barry
      </p>
    </div>
  );
};
