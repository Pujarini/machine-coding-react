import { useDispatch, useSelector } from "react-redux";
import { selectedChat, showChats } from "../../store/chatSlice";
import { clearChat } from "../../store/orderChatSlice";
import { getDate } from "../../utils/getDate";

const ChatListItem = ({ product }) => {
  const { title, orderId, messageList, imageURL, latestMessageTimestamp } =
    product;
  const dispatch = useDispatch();

  const fetchCurrentMessage = () => {
    let currentMessage =
      messageList &&
      messageList.filter(
        (message) => message.timestamp === latestMessageTimestamp
      );
    if (currentMessage) {
      return currentMessage[0]?.message;
    }
  };

  const onClickChatHandler = () => {
    dispatch(showChats());
    dispatch(selectedChat(product));
    dispatch(clearChat());
  };

  return (
    <li className="chatList__item" onClick={onClickChatHandler}>
      <div className="chatList__itemImage">
        <img src={imageURL} alt="item-image" height={40} width={40} />
      </div>
      <div className="chatList__itemDetails">
        <div className="chatList__itemOrderInfo">
          <span>{title}</span>
          <span style={{ color: "lightgray" }}>
            {getDate(latestMessageTimestamp)}
          </span>
        </div>
        <span style={{ marginTop: "2px" }}>{orderId}</span>
        <p style={{ color: "lightgrey", marginTop: "15px" }}>
          {fetchCurrentMessage()}
        </p>
      </div>
    </li>
  );
};

export default ChatListItem;
