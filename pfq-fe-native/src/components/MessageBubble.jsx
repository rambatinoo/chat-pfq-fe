import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const MessageBubble = ({ body, isSender, timestamp }) => {
  return (
    <View>
    <View
      style={[styles.container, isSender ? styles.sender : styles.receiver]}
    >
      <Text style={styles.messageText}>{body}</Text>
    </View>
    <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginLeft: 150,
  },
  timestamp : {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginLeft: 250,
  },
  sender: { backgroundColor: "#007AFF", alignSelf: "flex-end" },
  receiver: { backgroundColor: "#E5E5EA", alignSelf: "flex-start" },
  messageText: { color: "#fff" },
});
