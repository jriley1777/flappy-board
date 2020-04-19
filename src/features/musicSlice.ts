import { createSlice } from "@reduxjs/toolkit";

interface MusicProps {
    currentlyPlaying: string
}

const initial: MusicProps = {
  currentlyPlaying: 'Not active',
};

const music = createSlice({
  name: "music",
  initialState: initial,
  reducers: {
    setCurrentlyPlaying(state, action) {
      const track = action.payload;
      return {
        ...state,
        currentlyPlaying: track
      };
    },
    clearCurrentlyPlaying() {
      return initial;
    },
  },
});

export const { setCurrentlyPlaying, clearCurrentlyPlaying } = music.actions;

export default music.reducer;
