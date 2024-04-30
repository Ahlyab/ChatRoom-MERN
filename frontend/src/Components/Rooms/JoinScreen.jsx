import React, {useState} from "react";

const JoinScreen = ({ onJoin }) => {
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (username.length > 0) {
      onJoin(username);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <h2 className="text-3xl mb-4 font-bold">Join Chatroom</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm"
      >
        Join
      </button>
    </div>
  );
};

export default JoinScreen;
