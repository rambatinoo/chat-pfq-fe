import { useState, useEffect } from "react";
import { exec } from "../../../../pfq-fe-native/src/utils/encryption";
import { getRequest } from "../../../../pfq-fe-native/src/utils/api";
import './Login-styles.css'
import usernameIcon from "/username-icon.png"
import passwordIcon from "/password-icon.png"


export const Login = ({ setUsername }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [usernames, setUsernames] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsernames = await getRequest("users");
        const justUsernames = fetchedUsernames.map((user) => {
          return user.username;
        });
        setUsernames(justUsernames);
      } catch (err) {
        console.log("Error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [])

  const checkUsernameExists = () => {
    if (usernameText !== "") {
      !usernames.includes(usernameText.toLowerCase())
      ? setMessage("User doesn't exist.")
      : setMessage("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "username") {
      setUsernameText(e.target.value);
    } else {
      setPasswordText(e.target.value);
    }
  };

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
    <img src='../public/logo.png' id="logo"/>
    
      <form onSubmit={handleLogin}>
        <div className="username-input-wrapper">
        <img src={usernameIcon} id="username-icon"/>  
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={usernameText}
        ></input>
        </div>
        <div className="password-input-wrapper">
        <img src={passwordIcon} id="password-icon"/>  
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={passwordText}
        ></input>
        </div>
        <button type="submit">Login</button>
      </form>
      <p className='designtag'>
        Designed & built by: Liam, Matt, Jake & Barry
      </p>
    </div>
    </div>
  );
};
