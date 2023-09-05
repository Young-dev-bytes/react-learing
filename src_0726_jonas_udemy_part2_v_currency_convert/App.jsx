// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

//src_0726_jonas_udemy_part2_v_currency_convert
export default function App() {
  const [amount, setAmount] = useState("");
  const [frontCountry, setFrontCountry] = useState("USD");
  const [backCountry, setBackCountry] = useState("EUR");
  const [resultAmt, setResultAmt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAmount() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${frontCountry}&to=${backCountry}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong with fetch amount ");

        const data = await res.json();
        setResultAmt(data.rates[backCountry]);
      } catch (error) {
        if ("AbortError" !== error.name) {
          setErrorMsg(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (!amount) return;
    if (frontCountry === backCountry) setAmount(amount);

    fetchAmount();

    return () => controller.abort();
  }, [amount, frontCountry, backCountry]);

  return (
    <div>
      <Input amount={amount} onSetAmount={setAmount} />
      <SelectInput
        frontCountry={frontCountry}
        setFrontCountry={setFrontCountry}
        backCountry={backCountry}
        setBackCountry={setBackCountry}
      />

      {isLoading ? (
        <p>loading...</p>
      ) : !errorMsg ? (
        <OutPut resultAmt={resultAmt} />
      ) : (
        <p>error:${errorMsg}</p>
      )}
    </div>
  );
}

const Input = ({ amount, onSetAmount }) => {
  return (
    <>
      <input
        type="text"
        placeholder="money mounts..."
        value={amount}
        onChange={(event) => {
          onSetAmount(Number(event.target.value));
        }}
      />
    </>
  );
};

const SelectInput = ({
  frontCountry,
  setFrontCountry,
  backCountry,
  setBackCountry,
}) => {
  return (
    <>
      <select
        value={frontCountry}
        onChange={(event) => setFrontCountry(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={backCountry}
        onChange={(event) => setBackCountry(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </>
  );
};

const OutPut = ({ resultAmt }) => {
  return (
    <>
      <p>{resultAmt === 0 ? "" : resultAmt.toFixed(2)}</p>
    </>
  );
};
