import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const MessageBubble = ({ body, isSender, timestamp }) => {
  return (
    <View>
    <View
      style={[styles.container, isSender ? styles.sender : styles.receiver]}
    >
      <Text style={isSender? styles.messageText : styles.messageTextAdmin}>{body}</Text>
    </View>
    <Text style={isSender ? styles.timestamp : styles.timestampAdmin}>{timestamp}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "100%",
  },
  timestamp : {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
    marginLeft: 250,
  },
  timestampAdmin : {
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sender: { backgroundColor: "#007AFF", alignSelf: "flex-end" },
  receiver: { backgroundColor: "#E5E5EA", marginRight: 200},
  messageText: { color: "#fff" },
  messageTextAdmin: { color: "#000" },
});
