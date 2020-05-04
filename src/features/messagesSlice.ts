import { createSlice } from "@reduxjs/toolkit";
import { buildMessageLetterArray } from '../utils/messages/flap';
import Queue from '../utils/messages/Queue';
import * as Models from '../models/index';

interface MessagesProps {
    messageQueue: any[],
    nextMessage: string[]
}

const initial: MessagesProps = {
  messageQueue: new Queue().serialize(),
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
    enqueueMessage(state, action) {
      const message: Models.Message = action.payload;
      const newQueue = new Queue()
        .deserialize(state.messageQueue)
        .enqueue(message)
        .serialize();
      return {
        ...state,
        messageQueue: newQueue
      };
    },
    dequeueMessage(state) {
      const newQueue = new Queue()
        .deserialize(state.messageQueue)
        .dequeue()
        .serialize();
      return {
        ...state,
        messageQueue: newQueue
      };
    },
    clearMessages() {
      return initial;
    },
  },
});

export const {
  enqueueMessage,
  dequeueMessage,
  setNextMessage,
  clearMessages,
} = messages.actions;

export default messages.reducer;
