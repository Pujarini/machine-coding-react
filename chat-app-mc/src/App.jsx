import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductList } from "./utils/fetchProducts";
import { fetchProducts } from "./store/productSlice";
import ChatListComponent from "./components/ChatList";
import ChatViewComponent from "./components/ChatView";
import "./App.css";

function App() {
  const productList = useSelector((state) => state.products.productList);
  const chat = useSelector((state) => state.chats.showChats);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productList.length) {
      fetchProductListItems();
    }
  }, []);

  const fetchProductListItems = async () => {
    const response = await fetchProductList();
    dispatch(fetchProducts(response));
  };

  return (
    <div className="App">
      <ChatListComponent />
      {chat && <ChatViewComponent />}
    </div>
  );
}

export default App;
