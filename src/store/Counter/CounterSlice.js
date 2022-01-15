import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementTwo: (state) => {
      state.value += 2;
    },
    decrementThree: (state) => {
      state.value -= 3;
    },
  },
});

export const { increment, decrement, incrementTwo, decrementThree } =
  slice.actions;

export const resultValue = (state) => state.counter.value;

export default slice.reducer;
