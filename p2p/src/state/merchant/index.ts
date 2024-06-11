import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum screenId {
  ACCOUNTINFO,
  SELECTCRYPTO,
}

const initialState = {
  activeBar: screenId.ACCOUNTINFO,
  accountDetails: {
    bankName: undefined,
    accountNumber: undefined,
  },
  registerInput: {
    address: "",
    fullName: "",
    userName: "",
    phone: "",
    country_code: "",
    country: "",
    otp: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    referrerAddress: "",
    email: "",
  },
  selectedCrypto: [],
};

const createAccountUISlice = createSlice({
  name: "merchantUi",
  initialState,
  reducers: {
    setActiveBar(state, action) {
      state.activeBar = action.payload;
    },
    setAccountDetails(state, action) {
      state.accountDetails = action.payload;
    },
    setselectedCrypto(state, action) {
      state.selectedCrypto = action.payload;
    },
    setPersonalInfo(state, action) {
      state.registerInput.address = action.payload.address;
      state.registerInput.country_code = action.payload.country_code;
      state.registerInput.phone = action.payload.phone;
      state.registerInput.fullName = action.payload.fullName;
      state.registerInput.userName = action.payload.userName;
      state.registerInput.referrerAddress = action.payload.referrerAddress;
      state.registerInput.email = action.payload.emailAddress;
    },
    setOtp(state, action) {
      state.registerInput.otp = action.payload.otp;
    },
    setCountry(state, action) {
      state.registerInput.country = action.payload.country;
    },
    setBankInfo(state, action) {
      state.registerInput.account_name = action.payload.account_name;
      state.registerInput.bank_name = action.payload.bank_name;
      state.registerInput.account_number = action.payload.account_number;
    },
  },
});

export const {
  setActiveBar,
  setAccountDetails,
  setselectedCrypto,
  setPersonalInfo,
  setOtp,
  setCountry,
  setBankInfo,
} = createAccountUISlice.actions;
export default createAccountUISlice.reducer;
