import { useState } from "react";

const tipOptions = [
  { value: 0, label: "Dissatisfied (0%)" },
  { value: 5, label: "It was okay (5%)" },
  { value: 10, label: "It was good (10%)" },
  { value: 20, label: "Absolutely amazing ! (20%)" },
];

const App = () => {
  const [billValue, setBillValue] = useState("");
  const [tipValue, setTipValue] = useState(0);
  const [percentageValue, setPercentageValue] = useState(0);
  const [secondPercentageValue, setSecondPercentageValue] = useState(0);

  const calculateTip = (bill, percentage) => (percentage / 100 / 2) * bill;

  // change bill value
  const handleBillValue = (newBillValue) => {
    let firstTipValue = calculateTip(newBillValue, percentageValue);
    let secondTipValue = calculateTip(newBillValue, secondPercentageValue);

    setBillValue(newBillValue);
    setTipValue(firstTipValue + secondTipValue);
  };

  // clear bill value
  const handleClearBillValue = () => {
    setBillValue("");
    setTipValue(0);
    setPercentageValue(0);
    setSecondPercentageValue(0);
  };

  // handle select options
  const handleSelectValue = (percentValue) => {
    let firstTipValue = calculateTip(billValue, percentValue);
    let secondTipValue = calculateTip(billValue, secondPercentageValue);
    setPercentageValue(percentValue);
    setTipValue(firstTipValue + secondTipValue);
  };

  // handle second options
  const handleSecondSelectValue = (secondPercenValue) => {
    let firstTipValue = calculateTip(billValue, percentageValue);
    let secondTipValue = calculateTip(billValue, secondPercenValue);
    setSecondPercentageValue(secondPercenValue);
    setTipValue(firstTipValue + secondTipValue);
  };

  return (
    <div>
      <BillInput billValue={billValue} onHandleBillValue={handleBillValue} />
      <br />

      <YouSelect
        onHandleSelectValue={handleSelectValue}
        percentValue={percentageValue}
      >
        How did you like the service?&nbsp;&nbsp;&nbsp;
      </YouSelect>
      <br />

      <YouSelect
        onHandleSelectValue={handleSecondSelectValue}
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
        onChange={(event) => onHandleSelectValue(event.target.value)}
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
