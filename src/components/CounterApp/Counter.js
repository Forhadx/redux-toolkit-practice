import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  incrementTwo,
  decrementThree,
  //   resultValue,
  //   titleValue,
} from "../../store/Counter/CounterSlice";

const Counter = () => {
  //   const result = useSelector(resultValue);
  //   const title = useSelector(titleValue);
  const result = useSelector((state) => state.counter.value);
  const title = useSelector((state) => state.counter.title);
  const dispatch = useDispatch();

  return (
    <div className="counter-page">
      <h1>Counter APP</h1>
      <div className="result">{`${title}: ${result}`}</div>
      <div className="counter-btns">
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementTwo({ two: 2, four: 4 }))}>
          ADD 2
        </button>
        <button onClick={() => dispatch(decrementThree(3))}>SUB -3</button>
      </div>
    </div>
  );
};

export default Counter;
