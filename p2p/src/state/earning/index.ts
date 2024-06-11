import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface earning {
  address: string;
  username: null | string;
  rank: string;
  trading_volume: string;
  amount_earned: string;
}

const initialState = {
  asset: "RGP",
  page: 1,
  recordPerPage: 10,
  pageNumber: 1,
  earningRecords: [],
  total: 0,
};
const earningSlice = createSlice({
  name: "earning",
  initialState,
  reducers: {
    setAllPageNumber(state, action) {
      state.page = action.payload.page;
    },
    setEarningRecords(state, action) {
      const { earningRecords, total } = action.payload;
      state.earningRecords = earningRecords;
      state.total = total;
    },
  },
});

export const { setAllPageNumber, setEarningRecords } = earningSlice.actions;

export default earningSlice.reducer;
