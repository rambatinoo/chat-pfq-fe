import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import React, { useState, useEffect } from "react";
import { PaddedTextInput } from "./PaddedTextInput";
import { getRequest, postRequest } from "../utils/api";
import { hashPassword } from "../utils/encryption";
import logo from "../assets/images/logo.png";
import loader from "../assets/images/loader.gif";
import background from "../assets/images/native-background.png";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");

export const SignUpPage = ({
  setCreate,
  setMessage,
  setUsernameText,
  setPasswordText,
}) => {
  const [createPasswordText, setCreatePasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [message, setSignupMessage] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

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
  }, []);

  useEffect(() => {
    checkUsernameExists();
  }, [newUser.username]);

  const handleUsernameChange = (text) => {
    setNewUser({ ...newUser, username: text });
  };

  const handlePasswordChange = (text) => {
    setNewUser({ ...newUser, password: text });
    setCreatePasswordText(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPasswordText(text);
    if (text !== createPasswordText) {
      setSignupMessage("Passwords don't match");
    } else if (createPasswordText === "" && !confirmPasswordText === "") {
      setSignupMessage("");
    } else {
      setSignupMessage("");
    }
  };

  const checkUsernameExists = () => {
    usernames.includes(newUser.username.toLowerCase())
      ? setSignupMessage("Username already taken.")
      : setSignupMessage("");
  };

  const handleSignup = async () => {
    if (
      newUser.username &&
      createPasswordText === confirmPasswordText &&
      createPasswordText.length > 0
    ) {
      if (message === "Username already taken.") {
        setSignupMessage("Please choose a different username.");
        return;
      }
      try {
        setLoading(true);
        setDisabled(true);
        const hashedPassword = await hashPassword(newUser.password);
        const updatedUser = {
          username: newUser.username.toLowerCase(),
          password: hashedPassword,
          isAdmin: false,
        };
        const result = await postRequest("users", updatedUser);
        if (result.acknowledged) {
          setLoading(false);
          setNewUser({ ...newUser, username: "" });
          setConfirmPasswordText("");
          setCreatePasswordText("");
          setMessage("Account created!");
          setDisabled(false);
          setUsernameText(updatedUser.username);
          setPasswordText(newUser.password);
          setCreate(false);
          return;
        } else {
          setLoading(false);
          setSignupMessage("Error creating account, please try again.");
          setNewUser({ ...newUser, username: "" });
          setConfirmPasswordText("");
          setCreatePasswordText("");
          setDisabled(false);
          return;
        }
      } catch (err) {
        setLoading(false);
        setDisabled(false);
        console.log("Error:", err);
        throw err;
      }
    } else {
      setSignupMessage("Error: Please check all fields are completed.");
      return;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Image source={loader} style={styles.loader} />
      </View>
    );
  }

  return (
    <ImageBackground source={background} style={styles.background}>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={keyboard ? styles.keyboard : styles.container}>
        <Image source={logo} style={styles.logo} />
        <PaddedTextInput
          placeholder="Username *"
          value={newUser.username}
          onChangeText={handleUsernameChange}
          onBlur={checkUsernameExists}
          editable={!disabled}
          setKeyboard={setKeyboard}
        />
        <PaddedTextInput
          placeholder="Password *"
          value={createPasswordText}
          onChangeText={handlePasswordChange}
          secureTextEntry
          editable={!disabled}
          setKeyboard={setKeyboard}
        />
        <PaddedTextInput
          placeholder="Confirm password *"
          value={confirmPasswordText}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
          editable={!disabled}
          setKeyboard={setKeyboard}
        />
        <View
          style={[
            styles.messageContainer,
            message === "" && styles.invisibleMessageContainer,
          ]}
        >
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        <TouchableOpacity style={keyboard ? styles.createbuttonKeyboard : styles.createbutton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={keyboard ? styles.backButtonKeyboard : styles.backbutton}
          onPress={() => {
            setUsernameText("")
            setPasswordText("")
            setCreate(false);
          }}
        >
          <Text style={styles.buttonText}>Back to login</Text>
        </TouchableOpacity>
        <Text style={styles.designtag}>
          Designed & built by: Liam, Matt, Jake & Barry
        </Text>
      </View>
      </TouchableWithoutFeedback>
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
  keyboard: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 200
  },
  logo: {
    width: 180,
    height: 40,
    top: 75,
    position: "absolute",
  },
  message: {
    color: "white",
  },
  messageContainer: {
    color: "white",
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 25,
    height: 35,
  },
  invisibleMessageContainer: {
    backgroundColor: "transparent",
  },
  header: {
    fontSize: 25,
    paddingBottom: 20,
  },
  message: {
    color: "white",
  },
  createbutton: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
  },
  createbuttonKeyboard: {
    width: 175,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    width: 75,
    position: "absolute",
  },
  backbutton: {
    width: 130,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    position: "absolute",
    bottom: 50,
  },
  backButtonKeyboard : {
    width: 130,
    height: 40,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    position: "absolute",
    bottom: 350,
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
