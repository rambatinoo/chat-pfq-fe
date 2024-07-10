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
} from "react-native";
import { MessageBubble } from "./MessageBubble";
import { filterMessagesByUsername } from "../utils/filterMessagesByUsername";
import { getRequest } from "../utils/api";
import sendIcon from "../assets/images/send-icon.png";
import loader from "../assets/images/loader.gif";
import logo from "../assets/images/logo.png";

export const MessagingScreen = ({ username, socket, setUsername }) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [tableNum, setTableNum] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const getMessageThread = async () => {
      setLoading(true);
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
        setLoading(false);
        setMessages(updatedMessages);
      } catch (err) {
        setLoading(false);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image
            style={styles.logoutImg}
            source={require("../assets/images/Bootstrap-Bootstrap-Bootstrap-door-open.512.png")}
          />
        </TouchableOpacity>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.tableInput}
          placeholder="Table #"
          placeholderTextColor="#21409a"
          onChangeText={(text) => setTableNum(text)}
          value={tableNum}
        />
      </View>
      {loading ? (
        <View style={styles.messageListLoader}>
          <Image source={loader} style={styles.loader} />
          <Text style={styles.fetchingMessage}>Fetching messages...</Text>
        </View>
      ) : (
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
      )}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
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
  messageListLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingRight: 20,
    maxHeight: 50,
    backgroundColor: "#f0f0f0",
    flex: 1,
    width: 10
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  fetchingMessage: {
    paddingTop: 150,
    justifyContent: "center",
    alignSelf: "center",
    color: "#21409a",
    fontSize: 18,
    fontWeight: "bold",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    right: 5
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
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#21409a",
    marginHorizontal: 10,
  },
  loader: {
    height: 75,
    width: 75,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  tableInput: {
    height: 30,
    width: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#21409a",
    textAlign: "center",
  },
  logo: {
    width: 150,
    height: 50,
    marginLeft: 50,
  },
  logoutImg: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
