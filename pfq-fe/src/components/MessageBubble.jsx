import React from "react";
import { View, Text, StyleSheet } from "react-native";
export const MessageBubble = ({ body, isSender }) => {
  return (
    <View
      style={[styles.container, isSender ? styles.sender : styles.receiver]}
    >
      <Text style={styles.messageText}>{body}</Text>
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
  sender: { backgroundColor: "#007AFF", alignSelf: "flex-end" },
  receiver: { backgroundColor: "#E5E5EA", alignSelf: "flex-start" },
  messageText: { color: "#fff" },
});
