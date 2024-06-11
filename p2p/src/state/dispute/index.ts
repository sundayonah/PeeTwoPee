import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface disputeState  {
    isDisputeResponser : boolean,
}

const initialState : disputeState = {
    isDisputeResponser: false
}

const disputeStateSlice = createSlice({
    name : 'diputeState',
    initialState,
    reducers: {
        setDisputeResponder(state, action){
            state.isDisputeResponser = action.payload;
        }
    }
})

export const {
    setDisputeResponder
} = disputeStateSlice.actions


export default disputeStateSlice.reducer