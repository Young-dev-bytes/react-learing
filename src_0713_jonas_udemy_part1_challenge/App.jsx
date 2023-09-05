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
        <button onClick={() => setStep((pre) => pre - 1)}>-</button> - Step -{" "}
        {step}
        <button onClick={() => setStep((pre) => pre + 1)}> + </button>
      </div>
      <div className="btn">
        <button onClick={() => setCount((pre) => pre - step)}>-</button> - Count
        - {count}
        <button
          onClick={() =>
            setCount((pre) => {
              return pre + step;
            })
          }
        >
          {" "}
          +{" "}
        </button>
      </div>
      <hr />
      {/* <span>{`${date}`}</span> */}
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
    </>
  );
};

export default App;
