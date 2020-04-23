import { createSlice } from "@reduxjs/toolkit";
import { buildMessageLetterArray } from '../utils/flap';

interface MessagesProps {
    messageQueue: {
      id: string, 
      text: string,
      public: boolean,
      mode?: string,
      source?: string,
      url?: string,
    }[],
    nextMessage: string[]
}

const initial: MessagesProps = {
  messageQueue: [],
  nextMessage: buildMessageLetterArray({text: " "}),
};

const messages = createSlice({
  name: "messages",
  initialState: initial,
  reducers: {
    setNextMessage(state, action) {
      const nextMessage: string[] = action.payload;
      return {
        ...state,
        nextMessage,
      };
    },
    shiftFromQueue(state) {
      return {
        ...state,
        messageQueue: state.messageQueue.slice(1),
      };
    },
    setMessageQueue(state, action) {
      const queue: MessagesProps['messageQueue'] = action.payload;
      return {
        ...state,
        messageQueue: queue,
      };
    },
    clearMessages() {
      return initial;
    },
  },
});

export const {
         setNextMessage,
         setMessageQueue,
         clearMessages,
       } = messages.actions;

export default messages.reducer;
