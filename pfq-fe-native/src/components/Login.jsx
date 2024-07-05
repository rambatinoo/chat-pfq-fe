import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from "react-native";
import { exec } from "../utils/encryption";
import { getRequest } from "../utils/api";
import { PaddedTextInput } from "./PaddedTextInput";
import { SignUpPage } from "./SignUpPage";
import logo from "../assets/images/logo.png";
import background from "../assets/images/native-background.png";
import usernameIcon from "../assets/images/username-icon.png";
import padlock from "../assets/images/password-icon.png";
import loader from "../assets/images/loader.gif"

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

export const Login = ({ setUsername, username }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [message, setMessage] = useState("");
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (usernameText && passwordText) {
      setLoading(true)
      try {
        const user = await getRequest(`users/${usernameText.toLowerCase()}`);
        if (!user) {
          setLoading(false)
          setMessage("User doesn't exist!");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        const passwordCheck = await exec(user.password, passwordText);
        if (!passwordCheck) {
          setLoading(false)
          setMessage("Incorrect password, please try again.");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        setUsername(usernameText);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log("Error:", err);
        throw err;
      }
    } else {
      setMessage("Missing fields!");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  if (loading) {
    return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Image source={loader} style={styles.loader}/>
    </View>
  )
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      {!create ? (   <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <PaddedTextInput
          placeholder="Username"
          icon={usernameIcon}
          value={usernameText}
          onChangeText={setUsernameText}
        />
        <PaddedTextInput
          placeholder="Password"
          icon={padlock}
          value={passwordText}
          onChangeText={setPasswordText}
          secureTextEntry
        />
        {message && <View style={styles.messageContainer}><Text style={styles.message}>{message}</Text></View>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createbutton} onPress={() => setCreate(true)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.designtag}>Designed & built by: Liam, Matt, Jake & Barry</Text>
      </View>) : (<SignUpPage setCreate={setCreate} username={username} setLoading={setLoading}/>)}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    height: screenHeight,
    width: screenWidth,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    position: "absolute",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  message: {
    color: "white",
  },
  messageContainer: {
    color: "white",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 25
  },
  logo: {
    width: 180,
    height: 40,
    top: 75,
    position: "absolute"
  },
  button: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4
  },
  createbutton: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4
  },
  buttonText: {
    color: "#21409a",
    fontSize: 16,
    fontWeight: "600",
  },
  designtag: {
    position: "absolute",
    bottom: 5,
    color: "#21409a",
    fontSize: 8
  }
});
