import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import orderChatSlice from "./orderChatSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    chats: chatSlice,
    orderChat: orderChatSlice,
  },
});
