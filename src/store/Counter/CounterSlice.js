import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    arr: [1, 2, 4],
    title: "Total",
  },
  reducers: {
    increment: (state) => {
      console.log("valu: ", state.arr);
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementTwo: (state, action) => {
      return {
        ...state,
        value: state.value + action.payload.two,
      };
      //   state.value += action.payload.four;
    },
    decrementThree: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const { increment, decrement, incrementTwo, decrementThree } =
  slice.actions;

// export const resultValue = (state) => state.counter.value;
// export const titleValue = (state) => state.counter.title;

export default slice.reducer;

/**
    
    - export action function 
    
    - export state value which are commented now. But fetch state value by useSelection
            ex:  const result = useSelector((state) => state.counter.value);

    - payload carry one value or object of data

 */
