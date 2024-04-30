import io from "socket.io-client";

const socket = io("http://localhost:5555", {
  transports: ["websocket"],
}); // Replace with your server URL

export const connect = () => {
  // Handle connection logic here (optional)
  socket.connect();
  console.log("Socket connected");
};

export const disconnect = () => {
  // Handle disconnection logic here (optional)
  console.log("Socket disconnected");
  socket.disconnect(); // Disconnect manually
};

export const emitNewUser = (username, roomName) => {
  socket.emit("newuser", username);
};

export const emitChatMessage = (message) => {
  socket.emit("chat", message);
};

// Handle incoming events from the server
socket.on("connect", connect); // Listen for connection event (optional)
socket.on("disconnect", disconnect); // Listen for disconnection event

export { socket };
