import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../store/orderChatSlice";

const ChatComponent = () => {
  const chatMessages = useSelector((state) => state.orderChat.chats);
  const messages = useSelector((state) => state.chats.currentChat);
  const dispatch = useDispatch();

  const { messageList } = messages;

  console.log(chatMessages, messageList);

  useEffect(() => {
    const timerId = setTimeout(displayMessages, 2000);

    return () => clearTimeout(timerId);
  }, [messageList]);

  const renderMessages = (message) => {
    let messageType =
      message.sender === "USER"
        ? "user-chat"
        : message.messageType === "optionedMessage"
        ? "optionedMessage"
        : "bot-chat";
    return <p className={`chat ${messageType}`}>{message.message}</p>;
  };

  const sortMessages = (messages) => {
    let sortedMessages = [];
    if (messages.length > 1) {
      sortedMessages = messages
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp);
    } else {
      sortedMessages = [...messages];
    }
    return sortedMessages;
  };

  const displayMessages = () => {
    return (
      messageList &&
      sortMessages(messageList).map((message) => dispatch(addChat(message)))
    );
  };

  return (
    <section
      className={`chatSection ${!chatMessages.length ? "noMessageView" : ""}`}
    >
      <div className="chats">
        {chatMessages.length
          ? sortMessages(chatMessages).map(renderMessages)
          : !messageList.length
          ? "Send a message to chatting"
          : "loading..."}
      </div>
    </section>
  );
};

export default ChatComponent;
