import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import USDTLOGO from "../../assets/roundedlogo.svg";

export enum TrxState {
  WaitingForConfirmation,
  TransactionSubmitted,
  TransactionSuccessful,
  TransactionFailed,
}

interface IToken {
  id: number;
  img: string;
  name: string;
  type: string;
  display: boolean;
}

export interface modalState {
  
  message?: string;
  trxState: TrxState;
  urlNetwork?: string;
}

type ModalState = {
  modal: modalState | null | undefined;
  tokenGroup: Array<IToken>;
  message?: string;
  readonly blockNumber: { readonly [chainId: number]: number }
};

const initialState: ModalState = {
  blockNumber: {},
  modal: null,
  message: "",
  tokenGroup: [
    {
      id: 1,
      img: USDTLOGO,
      name: "RigelProtocol Extended",
      type: "RigelProtocol Extended",
      display: true,
    },
    {
      id: 2,
      img: USDTLOGO,
      name: "RigelProtocol Extended",
      type: "RigelProtocol Token List",
      display: false,
    },
  ],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setOpenModal(state, action) {
 
      state.modal = action.payload;
    },
    setCloseModal(state) {
      state.modal = null;
    },
    updateBlockNumber(state, action: PayloadAction<{ chainId: number; blockNumber: number }>) {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    }
  },
});

export const { setOpenModal, setCloseModal,updateBlockNumber } = applicationSlice.actions;
export default applicationSlice.reducer;
