import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import SearchChat from "./SearchChat";

const ChatList = () => {
  const [searchItem, setSearchItem] = useState("");
  const productList = useSelector((state) => state.products.productList);
  const chat = useSelector((state) => state.chats.showChats);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (productList) {
      setChats(productList);
    }
  }, [productList]);

  useEffect(() => {
    searchChatList();
  }, [searchItem]);

  const searchChatList = () => {
    const searched = chats.filter(
      (item) =>
        item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.orderId.toLowerCase().includes(searchItem.toLowerCase())
    );
    if (searched.length > 0 && searchItem.length) {
      setChats(searched);
    } else {
      setChats(productList);
    }
  };

  return (
    <section
      className={
        chat ? `chatList__container_withChatView` : `chatList__container`
      }
    >
      <SearchChat searchItemFn={setSearchItem} searchItem={searchItem} />
      <main className="chatList__wrapper">
        {chats &&
          chats.map((product) => {
            return <ChatListItem product={product} key={product.orderId} />;
          })}
      </main>
    </section>
  );
};

export default ChatList;
