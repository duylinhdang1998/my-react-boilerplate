import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayloadType {
  step: number;
}

const initialState: number = 0;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<PayloadType>) => {
      return state + action.payload.step;
    },
    decrementCounter: (state) => {
      return state - 1;
    },
  },
});

export const { incrementCounter, decrementCounter } = counterSlice.actions;

const counterReducer = counterSlice.reducer;

export default counterReducer;
