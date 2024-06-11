import { createSlice } from "@reduxjs/toolkit";
import { playSound } from "../../utils";

export type notification = {
  _id: string;
  createdAt: string;
  from: string;
  message: string;
  read_by_from: boolean;
  read_by_to: boolean;
  title: string;
  to: string;
  txnId? : string
};

interface notificationState {
    notifications: notification[],
  }

  const initialState : notificationState = {
    notifications: []
  }

const notificationSlice = createSlice({
    name: 'notification',
    initialState, 
    reducers : {
        addNotification(state, action) {
            if(state.notifications.length === 5){
              //remove the last
              state.notifications.pop()
              state.notifications.unshift(action.payload)
            }   else{ 
              state.notifications.unshift(action.payload)  
            }
        },
        clearNotiffications(state){
          state.notifications = []
        }
    }    
})

export const {
    addNotification,
    clearNotiffications
} = notificationSlice.actions

export default notificationSlice.reducer
