import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../store/orderChatSlice";

const ChatComponent = () => {
  const chatMessages = useSelector((state) => state.orderChat.chats);
  const messages = useSelector((state) => state.chats.currentChat);
  const dispatch = useDispatch();

  const chatContainer = useRef();

  const { messageList } = messages;

  useEffect(() => {
    chatContainer.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }, [added]);

  useEffect(() => {
    const timerId = setTimeout(displayMessages, 2000);

    return () => clearTimeout(timerId);
  }, [messageList]);

  const requestCallBackHandler = (text) => {
    const newChat = {
      message: "I want a callback",
      messageId: text,
      messageType: "text",
      sender: "USER",
      timestamp: new Date().getTime(),
    };
    if (text === "Request a call") {
      dispatch(addChat(newChat));
      setAdded(true);
    }
  };

  const renderMessages = (msg) => {
    const { sender, messageType, message, options } = msg;
    let typeMessage =
      sender === "USER"
        ? "user-chat"
        : messageType === "optionedMessage"
        ? "optionedMessage"
        : "bot-chat";
    if (messageType !== "optionedMessage") {
      return <p className={`chat ${typeMessage}`}>{message}</p>;
    } else {
      return (
        <div className={`chat ${typeMessage}`}>
          <header>{message}</header>
          <section>
            <ul>
              {options.map((opt) => {
                return (
                  <li
                    className="optionedMessage__optionList"
                    onClick={() => requestCallBackHandler(opt?.optionText)}
                  >
                    {opt?.optionText}{" "}
                    <span style={{ color: "lightgray" }}>
                      {opt?.optionSubText}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      );
    }
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
      sortMessages(messageList).map((message) =>
        setTimeout(() => dispatch(addChat(message)), 2000)
      )
    );
  };

  return (
    <section
      ref={chatContainer}
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
