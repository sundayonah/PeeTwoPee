import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  message: string;
  URL?: string;
  error: boolean;
  hasExploreLink ?: boolean
}

const initialState: ToastState = {
  message: '',
  URL: '',
  error: false,
  hasExploreLink: true
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastState>) => {
      state.message = action.payload.message;
      state.URL = action.payload.URL;
      state.error = action.payload.error;
      state.hasExploreLink = action.payload.hasExploreLink
    },
    removeToast: (state) => {
      state.message = '';
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
