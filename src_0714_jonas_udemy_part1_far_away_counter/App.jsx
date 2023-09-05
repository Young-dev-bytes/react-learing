import { useState } from "react";

const App = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date("July 13 2023");

  console.log("1", date);
  date.setDate(date.getDate() + count);

  console.log("2", date);

  return (
    <>
      <div className="btn">
        <input
          type="range"
          min={0}
          max={1000}
          onChange={(event) => setStep(event.target.value * 1)}
        />
        - Step - {step}
      </div>
      <hr />
      <div className="btn">
        <button onClick={() => setCount((pre) => pre - step)}> - </button>
        &nbsp;&nbsp;&nbsp;
        <input type="text" value={count} />
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => setCount((pre) => pre + step)}> + </button>
      </div>
      <hr />
      <p>
        <span>
          {count === 0
            ? "today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 ||
        (step !== 0 && (
          <button
            onClick={() => {
              setCount(0);
              setStep(0);
            }}
          >
            {" "}
            reset{" "}
          </button>
        ))}
    </>
  );
};

export default App;
