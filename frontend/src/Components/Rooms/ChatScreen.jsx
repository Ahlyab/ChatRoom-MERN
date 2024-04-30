import  { useEffect, useState } from "react";
import { socket, emitChatMessage } from "./Socket";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

function ChatScreen(props) {
  const { username, roomName } = props;

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUpdate = (update) => {
      setMessages((prevMessages) => [...prevMessages, { noti: update }]);
    };


    socket.on("chat", handleNewMessage);
    socket.on("update", handleUpdate);
    // socket.on("disconnect", handleDisconnect); // Handle disconnection

    return () => {
      socket.off("chat", handleNewMessage);
      socket.off("update", handleUpdate);
      // socket.off("disconnect", handleDisconnect); // Cleanup on unmount
    };
  }, [messages]);

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      emitChatMessage({ username: username, text: chatInput });
      setMessages((prevMessages) => [...prevMessages, { text: chatInput, username: username }]);
      setChatInput("");
    }
  };

  const handleDisconnect = () => {
    console.error("Disconnected from server");
    socket.emit("exituser", username);
    window.location.href = window.location.href;

    // Add logic to display disconnection message or attempt reconnect
  };

  // const {username, roomName} = props;
  //
  // const [messages, setMessages] = useState([]);
  // const [chatInput, setChatInput] = useState("");
  //
  // useEffect(() => {
  //   const handleNewMessage = (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   };
  //
  //   const handleUpdate = () => {
  //     socket.on("update", function (update) {
  //       setMessages((prevMessages) => [...prevMessages, {noti: update}]);
  //
  //     });
  //   }
  //
  //  handleUpdate();
  //
  //
  //   socket.on("chat", handleNewMessage);
  //
  //
  //   return () => socket.off("chat", handleNewMessage); // Cleanup on unmount
  // }, [messages]);
  //
  //
  // const handleSendMessage = async () => {
  //   if (chatInput.trim()) {
  //     emitChatMessage({username: username, text: chatInput});
  //     console.log(messages);
  //     setMessages((prevMessages) => [...prevMessages, {text: chatInput, username: username}]);
  //
  //     console.log(chatInput);
  //     setChatInput(""); // Clear chat input after sending message
  //   }
  // };

  // const handleUpdate = () => {
  //   socket.on("update", function (update) {
  //     console.log(update);
  //   });
  // }

  return (
    <div className="screen chat-screen flex flex-col h-screen">
      <div className="header bg-gray-800 flex justify-between items-center p-3">
        <div className="logo text-white font-bold">Chatroom</div>
        <button id="exit-chat" className="text-white hover:text-red-500" onClick={handleDisconnect}>
          Exit
        </button>
      </div>
      <div className="messages flex-grow overflow-y-auto p-3">
        {/* Map through messages and render them here */}
        {messages.map((message, index) => (
          <div key={index} className="message">
            {/*<strong>{message}</strong>*/}
            {message.noti ? <Notification noti={message.noti} /> :
            <Message username={message.username} text={message.text}  myusername={username}  />}
          </div>
        ))}
      </div>
      <div className="typebox bg-gray-200 flex items-center p-3">
        <input
          type="text"
          name=""
          id="message-input"
          className="flex-grow outline-none p-2 rounded-md"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          id="send-message"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
