import { TextInput, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import {useState} from "react"
import eyeIcon from "../assets/images/hide-icon.png";

export const PaddedTextInput = ({ placeholder, icon, value, onChangeText, secureTextEntry }) => {
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

  const styles = StyleSheet.create({
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
    messageContainer: {
      color: "white",
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      padding: 10,
      borderRadius: 25
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
  