import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fiatCurrencies } from "../../utils/constants/constants";

const initialState = {
  orderInput: {
    type: "",
    asset: "",
    token_address: "",
    fiat: "",
    price_type: "",
    price: 0,
    chainId: 97,
    crypto_amount: 200,
    limit_min: 0,
    limit_max: 0,
    status: "online",
    duration: 15,
    terms: "",
    auto_reply: "",
  },
  bankDetails: [],
  fiatCurrencies,
  tokenAddress: "",
  fiat: { name: "ALLS", logo: "", currency: "" },
  tokenSymbol: "",
  adTabIndex: 0,
  userAdType: "",
  userAllAdType: "",
  userAllAssetType: "All",
  userAllAdStatus: "",
  userAdsAssetLogo: "",
  orderStatus: "",
  editInput: {
    isEditAd: false,
    orderID: "",
    type: "",
    asset: "",
    token_address: "",
    token_decimal: 0,
    token_logo: "",
    fiat: "",
    price_type: "",
    price: 0,
    crypto_amount: 0,
    limit_min: 0,
    limit_max: 0,
    terms: "",
    auto_reply: "",
  },
  userAds: [],
  userAssetType: "",
  adStatus: "online",
  adsStartDate: null,
  adsEndDate: null,
  allAdsStartDate: null,
  allAdsEndDate: null,
  pageNumber: 1,
  allPageNumber: 1,
  recordPerPage: 5,
  adsTotal: 0,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setTradeInfo(state, action) {
      state.orderInput.type = action.payload.type;
      state.orderInput.asset = action.payload.asset;
      state.orderInput.fiat = action.payload.fiat;
      state.orderInput.price_type = action.payload.price_type;
      state.orderInput.price = action.payload.price;
    },
    setApprovedQuantity(state, action) {
      state.orderInput.limit_min = action.payload.limit_min;
      state.orderInput.limit_max = action.payload.limit_max;
      state.orderInput.crypto_amount = action.payload.crypto_amount;
    },
    setAutoResponse(state, action) {
      state.orderInput.status = action.payload.status;
      state.orderInput.terms = action.payload.terms;
      state.orderInput.auto_reply = action.payload.auto_reply;
    },
    setUserAdType(state, action) {
      state.userAdType = action.payload.userAdType;
    },
    setAdTabIndex(state, action) {
      state.adTabIndex = action.payload.adTabIndex;
      state.userAllAdStatus = action.payload.adTabIndex === 1 ? "online" : "";
    },
    setUserAssetType(state, action) {
      state.userAssetType = action.payload.userAssetType;
    },
    setAdStatus(state, action) {
      state.adStatus = action.payload.adStatus;
    },
    setUserAds(state, action) {
      state.userAds = action.payload.userAds;
      state.adsTotal = action.payload.adsTotal;
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload.orderStatus;
    },
    setUserAllAdType(state, action) {
      state.userAllAdType = action.payload.userAllAdType;
    },
    setUserAllAssetType(state, action) {
      state.userAllAssetType = action.payload.userAllAssetType;
      state.userAdsAssetLogo = action.payload.userAdsAssetLogo;
    },
    setUserAllAdStatus(state, action) {
      state.userAllAdStatus = action.payload.userAllAdStatus;
    },
    setAdsStartDate(state, action) {
      state.adsStartDate = action.payload.adsStartDate;
    },
    setAdsEndDate(state, action) {
      state.adsEndDate = action.payload.adsEndDate;
    },
    setAllAdsStartDate(state, action) {
      state.allAdsStartDate = action.payload.allAdsStartDate;
    },
    setAllAdsEndDate(state, action) {
      state.allAdsEndDate = action.payload.allAdsEndDate;
    },
    setIsEditAd(state, action) {
      state.editInput.isEditAd = action.payload.isEditAd;
      state.editInput.orderID = action.payload.orderID;
      state.editInput.type = action.payload.type;
      state.editInput.asset = action.payload.asset;
      state.editInput.fiat = action.payload.fiat;
      state.editInput.price = action.payload.price;
      state.editInput.crypto_amount = action.payload.crypto_amount;
      state.editInput.limit_min = action.payload.limit_min;
      state.editInput.limit_max = action.payload.limit_max;
      state.editInput.terms = action.payload.terms;
      state.editInput.auto_reply = action.payload.auto_reply;
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload.pageNumber;
    },
    setAllPageNumber(state, action) {
      state.allPageNumber = action.payload.allPageNumber;
    },
    setRecordPerPage(state, action) {
      state.recordPerPage = action.payload.recordPerPage;
    },
    setAdsTotal(state, action) {
      state.adsTotal = action.payload.adsTotal;
    },
    setSelectedFiat(state, action) {
      state.fiat = action.payload.fiat;
    },
    setTokenAddress(state, action) {
      state.tokenAddress = action.payload.tokenAddress;
    },
    setTokenSymbol(state, action) {
      state.tokenSymbol = action.payload.tokenSymbol;
    },
  },
});

export const {
  setTradeInfo,
  setApprovedQuantity,
  setAutoResponse,
  setUserAdType,
  setUserAssetType,
  setUserAllAdType,
  setUserAllAssetType,
  setUserAllAdStatus,
  setIsEditAd,
  setAdStatus,
  setAdsStartDate,
  setAdsEndDate,
  setAdTabIndex,
  setPageNumber,
  setRecordPerPage,
  setAllPageNumber,
  setAllAdsStartDate,
  setAllAdsEndDate,
  setAdsTotal,
  setTokenAddress,
  setTokenSymbol,
  setOrderStatus,
  setUserAds,
  setSelectedFiat,
} = adsSlice.actions;

export default adsSlice.reducer;
