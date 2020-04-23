import { RootState } from "../utils/redux";

export const getUser = (state: RootState) => state.auth.user;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getUserFetching = (state: RootState) => state.auth.isFetching;
export const getMessageQueue = (state: RootState) => state.messages.messageQueue;
export const getNextMessage = (state: RootState) => state.messages.nextMessage;

export const getSpotifyToken = (state: RootState) => {
    const { spotify }: any = state.auth.integrations;
    return (spotify && spotify.access_token) || '';
};
export const getSpotifyRefreshToken = (state: RootState) => {
  const { spotify }: any = state.auth.integrations;
  return (spotify && spotify.refresh_token) || "";
};
export const getCurrentlyPlayingAudio = (state: RootState) => state.music.currentlyPlaying;