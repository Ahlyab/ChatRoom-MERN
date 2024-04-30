const Message = (props) => {
    const { username, text, myusername } = props;
    const type = username===myusername?'my':'other';

    const messageClass = type === 'my' ? 'bg-blue-100 text-gray-800 rounded-lg px-4 py-2' : 'bg-gray-200 text-gray-700 rounded-lg px-4 py-2';

    return (
        <div className={`flex items-start mb-2 ${messageClass}`}>

                <div className="mr-2">
                    <span className="font-bold text-gray-800">{type === 'my' ? "You" : username}</span>
                </div>

            <div>
                <div className="text-sm">{text}</div>
            </div>
        </div>
    );
};

export default Message;
