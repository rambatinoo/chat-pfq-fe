import { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Text,
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
  }, [messages]);

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
          <MessageBubble body={item.body} isSender={item.sender} timestamp={item.created_at}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageContainer}
      />
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          onChangeText={(text) => setBody(text)}
          value={body}
          multiline={true}
          scrollEnabled={true}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.tableInput}
          placeholder="Table Number"
          onChangeText={(text) => setTableNum(text)}
          value={tableNum}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  messageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxHeight: 80,
    backgroundColor: "#f0f0f0",
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tableInput: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
