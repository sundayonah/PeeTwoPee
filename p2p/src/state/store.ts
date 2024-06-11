import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import user from "./user";
import application from "./application";
import accountUi from "./accountUi";
import ads from "./ads";
import order from "./order";
import lists from "./lists/reducer";
import toastReducers from "../components/Toast/toastSlice";
import merchant from "./merchant";
import marchantBadge from "./marchantBadge";
import council from "./council";
import tradeInfo from "./tradeInfo";
import tradeHistory from "./tradeHistory";
import referral from "./referral";
import dispute from "./dispute";
import notification from "./notification";
import accountdemo from './demoAccount'
import earning from "./earning";

const PERSISTED_KEYS: string[] = ["user", "transactions", "lists", "ads"];

const store = configureStore({
  reducer: {
    user,
    accountUi,
    application,
    ads,
    order,
    lists,
    marchantBadge,
    toast: toastReducers,
    merchantUi: merchant,
    councilUI: council,
    tradeInfo,
    tradeHistory,
    dispute,
    referral,
    notification,
    accountdemo,
    earning,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
