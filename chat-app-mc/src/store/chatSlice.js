import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChats: false,
  currentChat: {},
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    showChats: (state) => {
      state.showChats = true;
    },
    selectedChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { showChats, selectedChat } = chatSlice.actions;

export default chatSlice.reducer;
