import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Login } from "./components/Login";
import { MessagingScreen } from "./components/MessagingScreen";
import { io } from "socket.io-client";
const socket = io("http://localhost:6969");

export default function App() {
  const [username, setUsername] = useState("");
  return (
    <View style={styles.container}>
      {username ? (
        <MessagingScreen username={username} socket={socket} />
      ) : (
        <Login setUsername={setUsername} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
