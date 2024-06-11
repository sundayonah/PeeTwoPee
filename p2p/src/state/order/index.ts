import { createSlice } from "@reduxjs/toolkit";

export enum transactionData {
  "COMPLETE YOUR PAYMENT" = 1,
  "COIN RELEASE PENDING" = 2,
  "TRANSACTION COMPLETION" = 3,
}

export enum transactionOwnerData {
  "PAYMENT PENDING" = 1,
  "RELEASE COIN" = 2,
  "TRANSACTION COMPLETED" = 3,
}

export enum disputeData {
  "APPEALS" = 1,
  "REVIEWS & VOTING",
  "PERSONAL DECISIONS",
}

export type IOrder = {
  _id: string;
  type: string;
  asset: string;
  fiat: string;
  price_type: string;
  price: number;
  crypto_amount: number;
  sold: number;
  payment_method: string;
  limit_min: number;
  limit_max: number;
  duration: number;
  token_address?: string;
  terms: string;
  status: string;
  auto_reply: string;
  createdAt: string;
  updatedAt: string;

  user: {
    fullname: string;
    username: string;
    rank: string;
    completed_orders: number;
    order_completion_rate: string;
    address: string;
    userRankInfo: [
      {
        rank: any;
      }
    ];
  };
};

interface orderPage {
  orders: IOrder[];
  asset: string;
  fiat: { name: string; currency: string; logo: string };
  pageNumber: number;
  totalOrders: number;
  amount: number;
  recordPerPage: number;
  payment_method: string;
  suggestions: string[];
}

interface orderIntialState {
  buyOrders: orderPage;
  sellOrders: orderPage;
  refetchOrders: boolean;
}

const initialState: orderIntialState = {
  buyOrders: {
    orders: [],
    asset: "rgp",
    fiat: {
      name: "United States",
      logo: "https://flagcdn.com/32x24/us.png",
      currency: "USD",
    },
    suggestions:[],
    pageNumber: 1,
    totalOrders: 0,
    amount: 1,
    recordPerPage: 20,
    payment_method: "BANK TRANSFER",
  },
  sellOrders: {
    orders: [],
    asset: "rgp",
    suggestions:[],
    fiat: {
      name: "United States",
      logo: "https://flagcdn.com/32x24/us.png",
      currency: "USD",
    },
    pageNumber: 1,
    totalOrders: 0,
    amount: 1,
    payment_method: "BANK TRANSFER",
    recordPerPage: 20,
  },
  refetchOrders: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setBuyOrders(state, action) {
      state.buyOrders.orders = action.payload.order;
      state.buyOrders.totalOrders = action.payload.totalBuyOrders;
      state.buyOrders.suggestions = action.payload.suggestions;
    },
    setSellOrders(state, action) {
      state.sellOrders.orders = action.payload.order;
      state.sellOrders.totalOrders = action.payload.totalSellOrders;
      state.sellOrders.suggestions = action.payload.suggestions;
    },
    setBuyPageNumber(state, action) {
      state.buyOrders.pageNumber = action.payload.page;
    },
    setSellPageNumber(state, action) {
      state.sellOrders.pageNumber = action.payload.page;
    },
    setSellSelectedAsset(state, action) {
      state.sellOrders.asset = action.payload.asset;
    },
    setBuySelectedAsset(state, action) {
      state.buyOrders.asset = action.payload.asset;
    },
    setSellSelectedFiat(state, action) {
      state.sellOrders.fiat = action.payload.fiat;
    },
    setBuySelectedFiat(state, action) {
      state.buyOrders.fiat = action.payload.fiat;
    },
    setSellMinAmount(state, action) {
      state.sellOrders.amount = action.payload.amount;
    },
    setBuyMinAmount(state, action) {
      state.buyOrders.amount = action.payload.amount;
    },
    refetchOrders(state) {
      state.refetchOrders = !state.refetchOrders;
    },
  },
});

export const {
  setBuyOrders,
  setSellOrders,
  setBuyPageNumber,
  setSellPageNumber,
  setSellSelectedAsset,
  setBuySelectedAsset,
  setSellSelectedFiat,
  setBuySelectedFiat,
  setSellMinAmount,
  setBuyMinAmount,
  refetchOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
