const Message = (props) => {
  const { username, text, myusername } = props;
  const type = username === myusername ? "my" : "other";

  const messageClass =
    type === "my"
      ? "message break-all bg-white text-gray-700 p-2 self-end my-2 rounded-md shadow ml-3 ":
        "chat break-all bg-gray-900 text-white p-2 self-start my-2 rounded-md shadow mr-3"

  return (
    // <div className={`flex items-start mb-2 ${messageClass}`}>
    <div className={messageClass}>
       {type === "my" ? "You : " + text : username + " : " + text}
    </div>
  );
};

export default Message;
