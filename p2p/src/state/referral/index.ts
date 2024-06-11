import { createSlice  } from "@reduxjs/toolkit";
import { SUPPORTEDCOUNTRIES } from "../../utils/constants/constants";


const initialState = {
    cryptoCurriences : ["BUSD", "USDT", "RGP"],
    fiatCurrencies:SUPPORTEDCOUNTRIES,
    // fiatCurrencies : [{
    //  symbol:"NGN",
    //  nationality:"Nigeria"
    // },
    // {
    //     symbol:"USD",
    //   nationality:"united states"
    //   }
    // ],
    tokenAddress: '',
    tokenSymbol: '',
    referralTabIndex: 0,
    userAdType: "",
    userAllReferralType: '',
    userAllAssetType: '',
    userAllReferraltatus: '',
    userAssetType: "",
    ReferralStatus: "online",
    ReferralStartDate: null,
    ReferralEndDate: null,
    allReferralStartDate: null,
    allReferralEndDate: null,
    pageNumber: 1,
    allPageNumber: 1,
    recordPerPage: 5,
    ReferralTotal: 0,
}

const ReferralSlice = createSlice({
    name:"Referral",
    initialState,
    reducers: {
      setUserAdType(state, action){
        state.userAdType = action.payload.userAdType;
      },
      setReferralTabIndex(state, action){
        state.referralTabIndex = action.payload.referralTabIndex;
        state.userAllReferraltatus = action.payload.referralTabIndex === 1 ? "online" : "";
      },
      setUserAssetType(state, action){
        state.userAssetType = action.payload.userAssetType;
      },
      setReferraltatus(state, action){
        state.ReferralStatus = action.payload.ReferralStatus;
      },
      setUserAllReferralType(state, action){
        state.userAllReferralType = action.payload.userAllReferralType;
      },
      setUserAllAssetType(state, action){
        state.userAllAssetType = action.payload.userAllAssetType;
      },
      setUserAllReferralStatus(state, action){
        state.userAllReferraltatus = action.payload.userAllReferraltatus;
      },
      setReferralStartDate(state, action){
        state.ReferralStartDate = action.payload.ReferralStartDate;
      },
      setReferralEndDate(state, action){
        state.ReferralEndDate = action.payload.ReferralEndDate;
      },
      setAllReferralStartDate(state, action){
        state.allReferralStartDate = action.payload.allReferralStartDate;
      },
      setAllReferralEndDate(state, action){
        state.allReferralEndDate = action.payload.allReferralEndDate;
      },
      setPageNumber(state, action){
        state.pageNumber = action.payload.pageNumber;
      },
      setAllPageNumber(state, action){
        state.allPageNumber = action.payload.allPageNumber;
      },
      setRecordPerPage(state, action){
        state.recordPerPage = action.payload.recordPerPage;
      },
      setReferralTotal(state, action){
        state.ReferralTotal = action.payload.ReferralTotal;
      },
      setTokenAddress(state, action){
        state.tokenAddress = action.payload.tokenAddress;
      },
      setTokenSymbol(state, action){
        state.tokenSymbol = action.payload.tokenSymbol;
      },
    }
})

export const {
  setUserAdType,
  setUserAssetType,
  setUserAllReferralType,
  setUserAllAssetType,
  setUserAllReferralStatus,
  setReferraltatus,
  setReferralStartDate,
  setReferralEndDate,
  setReferralTabIndex,
  setPageNumber,
  setRecordPerPage,
  setAllPageNumber,
  setAllReferralStartDate,
  setAllReferralEndDate,
  setReferralTotal,
  setTokenAddress,
  setTokenSymbol,
} = ReferralSlice.actions

export default ReferralSlice.reducer
