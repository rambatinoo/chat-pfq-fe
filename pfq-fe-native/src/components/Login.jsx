import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { exec } from "../utils/encryption";
import { getRequest } from "../utils/api";
import { PaddedTextInput } from "./PaddedTextInput";
import { SignUpPage } from "./SignUpPage";
import logo from "../assets/images/logo.png";
import background from "../assets/images/native-background.png";
import usernameIcon from "../assets/images/username-icon.png";
import padlock from "../assets/images/password-icon.png";
import loader from "../assets/images/loader.gif";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

export const Login = ({ setUsername, username, socket }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [message, setMessage] = useState("");
  const [create, setCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (usernameText && passwordText) {
      setLoading(true);
      try {
        const user = await getRequest(`users/${usernameText.toLowerCase()}`);
        if (!user) {
          setLoading(false);
          setMessage("User doesn't exist!");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        const passwordCheck = await exec(user.password, passwordText);
        if (!passwordCheck) {
          setLoading(false);
          setMessage("Incorrect password, please try again.");
          setTimeout(() => setMessage(""), 5000);
          return;
        }
        setUsername(usernameText);
        setLoading(false);
        Keyboard.dismiss();
      } catch (err) {
        setLoading(false);
        console.log("Error:", err);
        throw err;
      }
    } else {
      setMessage("Missing fields!");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleDone = () => {
    Keyboard.dismiss();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Image source={loader} style={styles.loader} />
      </View>
    );
  }

  console.log(keyboardHeight);

  return (
    <View>
      {!create ? (
        <ImageBackground source={background} style={styles.background}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={keyboard ? styles.keyboard : styles.container}>
              <Image source={logo} style={styles.logo} />
              <PaddedTextInput
                placeholder="Username"
                icon={usernameIcon}
                value={usernameText}
                onChangeText={setUsernameText}
                onSubmitEditing={handleDone}
                setKeyboard={setKeyboard}
              />
              <PaddedTextInput
                placeholder="Password"
                icon={padlock}
                value={passwordText}
                onChangeText={setPasswordText}
                secureTextEntry
                setKeyboard={setKeyboard}
              />
              {message && (
                <View
                  style={
                    message === "Account created!"
                      ? styles.createdMessage
                      : styles.messageContainer
                  }
                >
                  <Text style={styles.message}>{message}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createbutton}
                onPress={() => setCreate(true)}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              {!keyboardHeight && (
                <Text style={styles.designtag}>
                  Designed & built by: Liam, Matt, Jake & Barry
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      ) : (
        <SignUpPage
          setCreate={setCreate}
          setMessage={setMessage}
          setUsernameText={setUsernameText}
          setPasswordText={setPasswordText}
          setKeyboard={setKeyboard}

        />
      )}
    </View>
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
  keyboard: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 150,
  },
  message: {
    color: "white",
  },
  messageContainer: {
    color: "white",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 25,
  },
  createdMessage: {
    backgroundColor: "rgba(50, 168, 82, 0.7)",
    textAlign: "center",
    verticalAlign: "middle",
    padding: 10,
    borderRadius: 25,
  },
  logo: {
    width: 180,
    height: 40,
    top: 75,
    position: "absolute",
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
    shadowRadius: 4,
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
    shadowRadius: 4,
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
    fontSize: 8,
  },
});
