import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TRANSACTION_TYPE  {
  COMPLETED = "COMPLETED",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
  }
export interface transaction {
  _id: string
  tx_id: string
  productId: string
  
  chainId: string
  asset: string
  fiat: string
  price: number
  crypto_amount: number
  from: string
  fee:string
  type:string
  to: string
  feedback: {
      to: string
      from: string
  }
  status: string
  createdAt: string
  updatedAt: string
}
export interface buyTrade {
  chainID: number, 
  timeStamp:string,
  transactionHash:string,
  purchaseToken: {
      symbol:string
      address:string
      decimals:number
  }
  purchaseAmount: string,
  from: string,
  productID:string,
  fee:string,
  to:string,
  type:string

}


const initialState = {
    asset: "all",
    page:1,
    recordPerPage:5,
    fiat:{name:"ALLS",logo:"",currency:""},
    adTabIndex: 0,
    userAllTradeLogo: "",
    userAdType: "",
    userAllAdType: '',
    userAllAssetType: 'All',
    userAllTradestatus: 'All',
    adStatus: "online",
    AllTradesStartDate: null,
    AllTradesEndDate: null,
    pageNumber: 1,
    adsTotal: 30,
    tradeRecords:[],
    total:0
}
const tradeSlice = createSlice({
    name:"trade",
    initialState,
    reducers: {
      setUserAdType(state, action){
        state.userAdType = action.payload.userAdType;
      },
      setUserAllAdType(state, action){
        state.userAllAdType = action.payload.userAllAdType;
      },
      setUserAllTradeStatus(state, action){
        state.userAllTradestatus = action.payload.userAllTradestatus;
      },
      setUserAllAssetType(state, action){
     state.userAllAssetType =action.payload.userAllAssetType
     state.userAllTradeLogo = action.payload.userAllTradeLogo
      },
      setAllTradesStartDate(state, action){
        state.AllTradesStartDate = action.payload.AllTradesStartDate

      },
      setAllTradesEndDate(state, action){
        state.AllTradesEndDate = action.payload.AllTradesEndDate
      },
      setSelectedFiat(state, action){
        state.fiat = action.payload.fiat
      },
      setAllPageNumber(state, action){
        state.page = action.payload.page
      },
      setTradeRecords(state, action){
        const {total,tradeRecords} = action.payload
        state.tradeRecords =  tradeRecords;
        state.total =  total
      },
    }
})

export const {
  setUserAdType,
  setUserAllAdType,
  setUserAllAssetType,
  setSelectedFiat,
  setAllPageNumber,
  setAllTradesStartDate,
  setAllTradesEndDate,
  setTradeRecords,
  setUserAllTradeStatus 
} = tradeSlice.actions

export default tradeSlice.reducer