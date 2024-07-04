import { useEffect, useState, useRef } from "react";
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { MessageBubble } from "./MessageBubble";
import { filterMessagesByUsername } from "../utils/filterMessagesByUsername";
import { getRequest } from "../utils/api";

export const MessagingScreen = ({ username, socket }) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const [tableNum, setTableNum] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    const getMessageThread = async () => {
      try {
        const messages = await getRequest("messages");
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
    if (body.trim() !== "") {
      socket.emit("send-customer-message", {
        body,
        tableNum,
        from: username,
        to: "admin",
        sender: true,
        created_at: new Date(),
      });
      setBody("");
      setTableNum("");
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <View style={styles.messageList}>
          <FlatList
            ref={flatListRef}
            data={filterMessagesByUsername(messages, username)}
            renderItem={({ item }) => (
              <MessageBubble
                body={item.body}
                isSender={item.sender}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 300,
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
  messageList: {
    maxHeight: "80%",
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
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

// import { useEffect, useState } from "react";
// import {
//   FlatList,
//   TextInput,
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
// } from "react-native";
// import { MessageBubble } from "./MessageBubble";

// export const MessagingScreen = ({ username, socket }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [tableNum, setTableNum] = useState("");

//   useEffect(() => {
//     socket.on('message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg])
//     })
//   }, [])

//   const sendMessage = () => {
//     if (body.trim() !== "") {
//       socket.emit("send-customer-message", {
//         body,
//         tableNum,
//         username,
//         sender: true,
//       });
//       setBody("");
//       setTableNum("");
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <MessageBubble body={item.body} isSender={item.sender} timestamp={item.created_at}/>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.messageContainer}
//       />
//       <View style={styles.messageInputContainer}>
//         <TextInput
//           style={styles.messageInput}
//           placeholder="Message"
//           onChangeText={(text) => setBody(text)}
//           value={body}
//           multiline={true}
//           scrollEnabled={true}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.middleContainer}>
//         <TextInput
//           style={styles.tableInput}
//           placeholder="Table Number"
//           onChangeText={(text) => setTableNum(text)}
//           value={tableNum}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   messageContainer: {
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
//   messageInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },
//   messageInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     maxHeight: 80,
//     backgroundColor: "#f0f0f0",
//     flex: 1,
//     marginRight: 10,
//   },
//   sendButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#007AFF",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   middleContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   tableInput: {
//     height: 40,
//     width: '80%',
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     paddingHorizontal: 10,
//   },
// });
