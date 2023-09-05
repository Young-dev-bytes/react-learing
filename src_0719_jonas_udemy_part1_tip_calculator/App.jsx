import { useState } from "react";

const tipOptions = [
  { value: 0, label: "Dissatisfied (0%)" },
  { value: 5, label: "It was okay (5%)" },
  { value: 10, label: "It was good (10%)" },
  { value: 20, label: "Absolutely amazing ! (20%)" },
];

const App = () => {
  return (
    <div>
      <TipCalculator />
    </div>
  );
};

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  const reset = () => {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  };

  return (
    <div>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage percentage={percentage1} setPercentage={setPercentage1}>
        How did you like the service?&nbsp;&nbsp;&nbsp;
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} setPercentage={setPercentage2}>
        How did your friend like the service?&nbsp;&nbsp;&nbsp;
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset reset={reset} />
        </>
      )}
    </div>
  );
};

const BillInput = ({ setBill, bill }) => {
  return (
    <div>
      <label>How much was the bill? &nbsp;&nbsp;&nbsp;</label>
      <input
        type="text"
        placeholder="bill..."
        value={bill}
        onChange={(event) => {
          setBill(Number(event.target.value));
        }}
      />
    </div>
  );
};

const SelectPercentage = ({ children, percentage, setPercentage }) => {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(event) => setPercentage(Number(event.target.value))}
      >
        {tipOptions.map((item, i) => {
          return (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Output = ({ bill, tip }) => {
  return (
    <h3>
      You pay ${bill + tip} (${bill}+ ${tip} tip)
    </h3>
  );
};

const Reset = ({ reset }) => {
  return <button onClick={reset}>reset</button>;
};

export default App;
