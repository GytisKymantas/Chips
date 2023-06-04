import { createSlice } from '@reduxjs/toolkit';

const initialState = {
deposit_1:700,
deposit_2:0,
deposit_3:0,
deposit_4:0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
 addDeposit:(state,action) => {
  const { depositNumber, amount } = action.payload;
  if (depositNumber === 1) {
    state.deposit_1 = Math.min(state.deposit_1 + amount, 1800);
  } else if (depositNumber === 2) {
    state.deposit_2 = Math.min(state.deposit_2 + amount, 4100);
  }
 }
  },
});

export const { addDeposit } = counterSlice.actions;

export default counterSlice.reducer;