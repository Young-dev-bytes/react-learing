import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function DateCounter() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + state.step };
      case "DECREMENT":
        return { ...state, count: state.count - state.step };
      case "INPUT_VALUE":
        return { ...state, count: action.payLoad };
      case "INPUT_STEP":
        return { ...state, step: action.payLoad };
      case "RESET":
        return initialState;
      default:
        return new Error("unknown");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "DECREMENT" });
  };

  const inc = function () {
    dispatch({ type: "INCREMENT" });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  const defineCount = function (e) {
    dispatch({ type: "INPUT_VALUE", payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "INPUT_STEP", payLoad: Number(e.target.value) });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
