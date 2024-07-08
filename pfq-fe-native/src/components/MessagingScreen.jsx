import { useEffect, useState, useRef } from "react";
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";
import { MessageBubble } from "./MessageBubble";
import { filterMessagesByUsername } from "../utils/filterMessagesByUsername";
import { getRequest } from "../utils/api";
import sendIcon from "../assets/images/send-icon.png";

export const MessagingScreen = ({ username, socket, setUsername }) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [tableNum, setTableNum] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    const getMessageThread = async () => {
      try {
        const messages = await getRequest("messages", { username });
        const updatedMessages = messages.map((message) => {
          if (message.from === username.toLowerCase()) {
            message.sender = true;
            return message;
          } else {
            return message;
          }
        });
        setMessages(updatedMessages);
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    };

    getMessageThread();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prevMessages) => {
        return [...prevMessages, msg];
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [messages]);

  const sendMessage = () => {
    const date = new Date().toISOString();
    if (body.trim() !== "") {
      socket.emit("send-customer-message", {
        body,
        tableNum,
        from: username,
        to: "admin",
        created_at: date,
      });
      setBody("");
      setTableNum("");
    }
  };

  const handleLogout = () => {
    setUsername("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image style={styles.logoutImg} source={require('../assets/images/Bootstrap-Bootstrap-Bootstrap-door-open.512.png')}/>
        </TouchableOpacity>
        <TextInput
          style={styles.tableInput}
          placeholder="Table Number"
          onChangeText={(text) => setTableNum(text)}
          value={tableNum}
        />
      </View>
      <View style={styles.messageList}>
        <FlatList
          ref={flatListRef}
          data={filterMessagesByUsername(messages, username)}
          renderItem={({ item }) => (
            <MessageBubble
              to={item.to}
              body={item.body}
              timestamp={item.created_at}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messageContainer}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
      </View>
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
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    justifyContent: "center",
    width: "100%",
  },
  messageList: {
    flex: 1,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxHeight: 50,
    backgroundColor: "#f0f0f0",
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  tableInput: {
    height: 40,
    width: "60%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  logoutImg: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  }
});