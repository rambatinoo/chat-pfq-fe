import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from "react-native";
import { exec } from "../utils/encryption";
import { getRequest } from "../utils/api";
import logo from "../assets/images/logo.png";
import background from "../assets/images/native-background.png";
import usernameIcon from "../assets/images/username-icon.png";
import padlock from "../assets/images/password-icon.png";
import eyeIcon from "../assets/images/hide-icon.png";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

const PaddedTextInput = ({ placeholder, icon, value, onChangeText, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor="#21409a"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={secureTextEntry && !showPassword}
      />
          {secureTextEntry && (
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
          <Image source={eyeIcon} style={styles.eyeIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const Login = ({ setUsername }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (usernameText && passwordText) {
      try {
        const user = await getRequest(`users/${usernameText.toLowerCase()}`);
        if (!user) {
          setMessage("User doesn't exist!");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        const passwordCheck = await exec(user.password, passwordText);
        if (!passwordCheck) {
          setMessage("Incorrect password, please try again.");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        setUsername(usernameText);
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    } else {
      setMessage("Missing fields!");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
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
        {message && <Text style={{ color: "red" }}>{message}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createbutton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.designtag}>Designed & built by: Liam, Matt, Jake & Barry</Text>
      </View>
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    width: 250,
    height: 40,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20
  },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 10,
  },
  inputFocused: {
    borderColor: "#007AFF",
  },
  logo: {
    width: 180,
    height: 40,
    bottom: 125,
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
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 25,
    height: 20,
  },
});
