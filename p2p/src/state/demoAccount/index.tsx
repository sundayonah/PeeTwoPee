import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    demoRPG : 20,
    demoBNB : 20,
    isDemoAccount : false
}

const demoAccountSlice = createSlice({
    name: 'demoAccount',
    initialState,
    reducers : {
        incrementDemoRGPAccount (state, action){
            state.demoRPG =  state.demoRPG  - action.payload
        },
        incrementDemoBNBAccount (state, action){
            state.demoBNB =  state.demoBNB  - action.payload
        },
        toggleDemoAccont (state, action){
            state.isDemoAccount = action.payload
        }
    }
})

export const {incrementDemoBNBAccount, incrementDemoRGPAccount, toggleDemoAccont} =
  demoAccountSlice.actions;
export default demoAccountSlice.reducer;
