import { createSlice } from "@reduxjs/toolkit";
import { buildMessageLetterArray } from '../utils/flap';

interface MessagesProps {
    messageQueue: string[],
    nextMessage: string[]
}

const initial: MessagesProps = {
  messageQueue: [],
  nextMessage: buildMessageLetterArray(" "),
};

const messages = createSlice({
  name: "messages",
  initialState: initial,
  reducers: {
    setNextMessage(state, action) {
      const nextMessage: string[] = action.payload;
      return {
          ...state,
          nextMessage
      };
    },
    addMessageToQueue(state, action) {
      const message: string = action.payload;
      return {
        ...state,
        messageQueue: [
          message,
          ...state.messageQueue,
        ]
      };
    },
    setMessageQueue(state, action) {
      const queue: string[] = action.payload;
      return {
        ...state,
        messageQueue: queue
      }
    },
    clearMessages() {
        return initial;
    }
  },
});

export const {
         setNextMessage,
         addMessageToQueue,
         setMessageQueue,
         clearMessages,
       } = messages.actions;

export default messages.reducer;
