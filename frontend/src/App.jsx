import React, { useState, useEffect } from "react";
import ChatScreen from "./Components/Rooms/ChatScreen.jsx";
import JoinScreen from "./Components/Rooms/JoinScreen.jsx";
import { emitNewUser } from "./Components/Rooms/Socket.jsx";
import Rooms from "./Pages/Rooms.jsx";

function App() {
  const [username, setUsername] = useState(null);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    // Extract room name from URL
    const urlParams = window.location.href.split("/");
    setRoomName(urlParams[urlParams.length - 1]);
  }, []);

  const onJoin = (name) => {
    setUsername(name);
    emitNewUser(name, "");
  };

  return (
    // <div className="h-screen flex flex-col">
    //   {username ? (
    //     <ChatScreen username={username} roomName={roomName} />
    //   ) : (
    //     <JoinScreen onJoin={onJoin} />
    //   )}
    // </div>
    <Rooms />
  );
}

export default App;
