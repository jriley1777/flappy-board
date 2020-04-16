import { RootState } from "../utils/redux";

export const getMessageQueue = (state: RootState) => state.messages.messageQueue;
export const getNextMessage = (state: RootState) => state.messages.nextMessage;