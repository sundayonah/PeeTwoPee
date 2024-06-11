import { createSlice } from "@reduxjs/toolkit";

export enum screanId {
  CREATEACCOUNT,
  VERIFYNUMBER,
  TRADE,
  PAYMETHOD,
}

export enum AdsPostSteps {
  TRADETYPE,
  APPROVEQUANTITY,
  PAYMETHOD,
  AUTORESPONSE,
}

const initialState = {
  activeBar: screanId.CREATEACCOUNT,
  activeAdsBar: AdsPostSteps.TRADETYPE,
  refresh: false,
  accountDropDown: false
};

const createAccountUISlice = createSlice({
  name: "accountUi",
  initialState,
  reducers: {
    setActiveBar(state, action) {
      state.activeBar = action.payload;
    },

    setAdsBar(state, action) {
      state.activeAdsBar = action.payload;
    },
    setCreateAccountRefresh(state, action) {
      state.refresh = action.payload;
    },
   
    toggleAccountDropDown(state) {
      state.accountDropDown = !state.accountDropDown
    },

  },
});

export const { setActiveBar, setAdsBar, setCreateAccountRefresh , toggleAccountDropDown} =
  createAccountUISlice.actions;
export default createAccountUISlice.reducer;
