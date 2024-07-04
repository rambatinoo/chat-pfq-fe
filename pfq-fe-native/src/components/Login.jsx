import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { exec } from "../utils/encryption";
import { getRequest } from "../utils/api";


export const Login = ({ setUsername }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (usernameText && passwordText) {
      try {
        const user = await getRequest(`users/${usernameText.toLowerCase()}`)
        if (!user) {
          setMessage("User doesn't exist!")
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
    <View>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={(text) => setUsernameText(text)}
        value={usernameText}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => setPasswordText(text)}
        value={passwordText}
        secureTextEntry
      />
      {message && <Text style={{"color": "red"}}>{message}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 180,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
