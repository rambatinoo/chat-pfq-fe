import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { PaddedTextInput } from "./PaddedTextInput";
import { getRequest, postRequest } from "../utils/api";
import { hashPassword } from "../utils/encryption";
import logo from "../assets/images/logo.png";

export const SignUpPage = ({ setCreate, username, setLoading }) => {
  const [createPasswordText, setCreatePasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsernames = await getRequest("users");
      const justUsernames = fetchedUsernames.map((user) => {
        return user.username;
      });
      setUsernames(justUsernames);
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
      setMessage("Passwords don't match");
    } else if (createPasswordText === "" && !confirmPasswordText === "") {
      setMessage("");
    } else {
      setMessage("");
    }
  };

  const checkUsernameExists = () => {
    usernames.includes(newUser.username.toLowerCase())
      ? setMessage("Username already taken.")
      : setMessage("");
  };

  const handleSignup = async () => {
    if (
      newUser.username &&
      createPasswordText === confirmPasswordText &&
      createPasswordText.length > 0
    ) {
      if (message === "Username already taken.") {
        setMessage("Please choose a different username.");
        return;
      }
      try {
        setLoading(true)
        const hashedPassword = await hashPassword(newUser.password);
        const updatedUser = {
          username: newUser.username.toLowerCase(),
          password: hashedPassword,
          isAdmin: false,
        };
        const result = await postRequest("users", updatedUser);
        if (result.acknowledged) {
            setLoading(false)
          setNewUser({ ...newUser, username: "" });
          setConfirmPasswordText("");
          setCreatePasswordText("");
          setMessage("Account created!");
          return;
        } else {
            setLoading(false)
          setMessage("Error creating account, please try again.");
          setNewUser({ ...newUser, username: "" });
          setConfirmPasswordText("");
          setCreatePasswordText("");
          return;
        }
      } catch (err) {
        setLoading(false)
        console.log("Error:", err);
        throw err;
      }
    } else {
      setMessage("Error: Please check all fields are completed.");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <PaddedTextInput
        placeholder="Username *"
        value={newUser.username}
        onChangeText={handleUsernameChange}
        onBlur={checkUsernameExists}
      />
      <PaddedTextInput
        placeholder="Password *"
        value={createPasswordText}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <PaddedTextInput
        placeholder="Confirm password *"
        value={confirmPasswordText}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
      />
      <View
        style={[
          styles.messageContainer,
          message === "" && styles.invisibleMessageContainer,
          message === "Account created!" && styles.createdMessage,
        ]}
      >
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      <TouchableOpacity style={styles.createbutton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backbutton}
        onPress={() => {
          setCreate(false);
        }}
      >
        <Text style={styles.buttonText}>Back to login</Text>
      </TouchableOpacity>
      <Text style={styles.designtag}>
        Designed & built by: Liam, Matt, Jake & Barry
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 180,
    height: 40,
    top: 75,
    position: "absolute"
  },
  message: {
    color: "white",
  },
  createdMessage: {
    backgroundColor: "rgba(50, 168, 82, 0.7)",
    textAlign: "center",
    verticalAlign: "middle",
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
