import { useState } from "react";

const tipOptions = [
  { value: 0, label: "Dissatisfied (0%)" },
  { value: 5, label: "It was okay (5%)" },
  { value: 10, label: "It was good (10%)" },
  { value: 20, label: "Absolutely amazing ! (20%)" },
];

const App = () => {
  const [billValue, setBillValue] = useState("");
  const [percentageValue, setPercentageValue] = useState(0);
  const [secondPercentageValue, setSecondPercentageValue] = useState(0);

  const tipValue =
    billValue * ((percentageValue + secondPercentageValue) / 100 / 2);

  // change bill value
  const handleBillValue = (newBillValue) => {
    setBillValue(newBillValue);
  };

  // clear bill value
  const handleClearBillValue = () => {
    setBillValue("");
    setPercentageValue(0);
    setSecondPercentageValue(0);
  };

  return (
    <div>
      <BillInput billValue={billValue} onHandleBillValue={handleBillValue} />
      <br />

      <YouSelect
        onHandleSelectValue={setPercentageValue}
        percentValue={percentageValue}
      >
        How did you like the service?&nbsp;&nbsp;&nbsp;
      </YouSelect>
      <br />

      <YouSelect
        onHandleSelectValue={setSecondPercentageValue}
        percentValue={secondPercentageValue}
      >
        How did your friend like the service?&nbsp;&nbsp;&nbsp;
      </YouSelect>
      {billValue && (
        <CalcultorButton
          billValue={billValue}
          tipValue={tipValue}
          onHandleClearBillValue={handleClearBillValue}
        />
      )}
    </div>
  );
};

const BillInput = ({ onHandleBillValue, billValue }) => {
  return (
    <div>
      How much was the bill? &nbsp;&nbsp;&nbsp;
      <input
        type="text"
        value={billValue}
        placeholder="bill..."
        onChange={(event) => onHandleBillValue(event.target.value * 1)}
      />
    </div>
  );
};

const YouSelect = ({ onHandleSelectValue, percentValue, children }) => {
  return (
    <div>
      {children}
      <select
        value={percentValue}
        onChange={(event) => onHandleSelectValue(Number(event.target.value))}
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

const CalcultorButton = ({ billValue, tipValue, onHandleClearBillValue }) => {
  return (
    <>
      <br />
      <h3>
        You pay ${billValue + tipValue} (${billValue} + ${tipValue} tip)
      </h3>
      <br />
      &nbsp;&nbsp;<button onClick={onHandleClearBillValue}>reset</button>
    </>
  );
};

export default App;
