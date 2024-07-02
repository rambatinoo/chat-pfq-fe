import { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { exec } from "../utils/encryption";

export const Login = ({ setUsername }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const validUsers = ["barry", "matt"];
  const [message, setMessage] = useState("");


  
  const handleLogin = async () => {
    if (passwordText) {
      const result = await exec(passwordText);
      if (result) {
        validUsers.includes(usernameText.toLowerCase())
          ? setUsername(usernameText)
          : setMessage("Invalid Username");
      } else {
        setMessage("Incorrect Password");
      }
    }
  };

  return (
    <View>
      {message && <Text>{message}</Text>}

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
