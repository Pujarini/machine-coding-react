import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../store/orderChatSlice";
import ChatComponent from "./ChatComponent";

const ChatView = () => {
  const currentProduct = useSelector((state) => state.chats.currentChat);
  const { title, imageURL } = currentProduct;
  const [chatMsg, setChatMsg] = useState("");
  const dispatch = useDispatch();

  const chatHandler = (e) => {
    e.preventDefault();
    const newChat = {
      message: chatMsg,
      messageId: chatMsg,
      messageType: "text",
      sender: "USER",
      timestamp: new Date().getTime(),
    };
    dispatch(addChat(newChat));
    setChatMsg("");
  };

  return (
    <div className="chatView__container">
      <header className="chatView__productInfo">
        <img src={imageURL} height={40} width={40} />
        <span>{title}</span>
      </header>
      <ChatComponent />
      <section className="messageView">
        <form onSubmit={chatHandler} className="messageView_wrapper">
          <input
            type="text"
            placeholder="Type a message..."
            value={chatMsg}
            onChange={(e) => setChatMsg(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default ChatView;
