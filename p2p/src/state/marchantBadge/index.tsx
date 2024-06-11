import { createSlice } from "@reduxjs/toolkit";

export enum marchantBadgeScreens {
  STAKE,
  SupportedCrypto,
  STARTVOTING
}

const initialState = {
  activeBar: marchantBadgeScreens.STAKE,
};

const updateMarchantBadgeUI = createSlice({
  name: "marchantUiFlow",
  initialState,
  reducers: {
    setActiveScreen(state, action) {
      state.activeBar = action.payload;
    },
  },
});

export const { setActiveScreen } =
  updateMarchantBadgeUI.actions;
export default updateMarchantBadgeUI.reducer;
