import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum screenId {
  WALLET,
  STARTVOTING
}

const initialState = {
  activeBar: screenId.WALLET,
  votes: [],
};

const createAccountUISlice = createSlice({
  name: "councilUI",
  initialState,
  reducers: {
    setActiveBar(state, action) {
      state.activeBar = action.payload;
    },
    startVoting(state, action) {
      state.votes = action.payload;
    },
  },
});

export const { setActiveBar, startVoting } =
  createAccountUISlice.actions;
export default createAccountUISlice.reducer;
