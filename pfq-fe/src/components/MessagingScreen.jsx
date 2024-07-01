import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { MessageBubble } from "./MessageBubble";

export const MessagingScreen = ({ username, socket }) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [tableNum, setTableNum] = useState("");

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log(msg);
      setMessages((prevMessages) => {
        return [...prevMessages, msg];
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (body.trim() !== "") {
      socket.emit("send-customer-message", {
        body,
        tableNum,
        username,
        sender: true,
      });
      setBody("");
      setTableNum("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble body={item.body} isSender={item.sender} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          onChangeText={(text) => setBody(text)}
          value={body}
        />
        <TextInput
          style={styles.input}
          placeholder="Table Number"
          onChangeText={(text) => setTableNum(text)}
          value={tableNum}
        />
        <Button title="Send" onPress={sendMessage}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 180,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: { flex: 1, justifyContent: "space-between" },
  messageContainer: { paddingHorizontal: 10, paddingVertical: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
