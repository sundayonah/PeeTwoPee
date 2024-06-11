import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tradeInfoStateType {
  userBuyOrders: Array<{
    amountToPay: string;
    orderId: string;
    amountToReceive: string;
    fiat: string;
    asset: string;
    price: number;
    token_address?: string;
  }>;
}

const initialState: tradeInfoStateType = {
  userBuyOrders: [],
};

const tradeInfoSlice = createSlice({
  name: "tradeInfo",
  initialState,
  reducers: {
    setOrderInfo(state, action) {
      const inState = state.userBuyOrders.find(
        (item) => item.orderId === action.payload.id
      );
      const order = {
        amountToPay: action.payload.amountToPay,
        orderId: action.payload.id,
        amountToReceive: action.payload.amountToReceive,
        fiat: action.payload.fiat,
        crypto: action.payload.crypto,
        asset: action.payload.asset,
        price: action.payload.price,
        token_address: action.payload?.token_address,
      };

      if (inState) {
        const index = state.userBuyOrders.findIndex((item) => {
          return item.orderId === action.payload.id;
        });
        state.userBuyOrders[index] = order;
      } else {
        state.userBuyOrders.push(order);
      }
    },
  },
});

export const { setOrderInfo } = tradeInfoSlice.actions;
export default tradeInfoSlice.reducer;
