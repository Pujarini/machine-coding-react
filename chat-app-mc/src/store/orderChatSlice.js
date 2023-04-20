import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

export const orderChatSlice = createSlice({
  name: "orderChats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
    clearChat: (state) => {
      state.chats = [];
    },
  },
});

export const { addChat, clearChat } = orderChatSlice.actions;

export default orderChatSlice.reducer;
