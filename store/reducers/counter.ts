import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deposit_1: 700,
  deposit_2: 0,
  deposit_3: 0,
  deposit_4: 0,
  active_modal: 0,
  claimed:[],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addDeposit: (state, action) => {
      const { depositNumber, amount } = action.payload;
      if (depositNumber === 1) {
        state.deposit_1 = Math.min(state.deposit_1 + amount, 1800);
      } else if (depositNumber === 2) {
        state.deposit_2 = Math.min(state.deposit_2 + amount, 4100);
      } else if (depositNumber === 3) {
        state.deposit_3 = Math.min(state.deposit_3 + amount, 5000);
      } else if (depositNumber === 4) {
        state.deposit_4 = Math.min(state.deposit_4 + amount, 6000);
      }
    },
    addDepositModal: (state, action) => {
      state.active_modal = action.payload;
    },
    addClaimed: (state, action) => {
      const newValue = action.payload;
      if (!state.claimed.includes(newValue)) {
        state.claimed = [...state.claimed, newValue];
      }
    },
  },
});

export const { addDeposit, addDepositModal,addClaimed } = counterSlice.actions;

export default counterSlice.reducer;
