import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  incrementTwo,
  decrementThree,
  resultValue,
} from "../../store/Counter/CounterSlice";

const Counter = () => {
  const result = useSelector(resultValue);
  const dispatch = useDispatch();

  return (
    <div className="counter-page">
      <h1>Counter APP</h1>
      <div className="result">{result}</div>
      <div className="counter-btns">
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementTwo())}>ADD 2</button>
        <button>SUB -3</button>
      </div>
    </div>
  );
};

export default Counter;
