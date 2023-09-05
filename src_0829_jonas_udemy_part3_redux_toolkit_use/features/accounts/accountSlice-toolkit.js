import { createSlice } from "@reduxjs/toolkit";
import { ACCOUNT_CONVERTING_CURRENCY, ACCOUNT_DEPOSIT } from "../../constant";

const initialState = {
  balance: 1000,
  loan: 0,
  loanPurpose: "",
  currency: "USD",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer: (state, action) => {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan: (state) => {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency: (state) => {
      state.isLoading = true;
    },
  },
});

console.log("accountSlice", accountSlice);
console.log(accountSlice.getInitialState());

export const deposit = (amount, currency) => {
  if (currency === initialState.currency)
    return {
      type: ACCOUNT_DEPOSIT,
      payload: amount,
    };

  return async function (dispatch, getState) {
    dispatch({ type: ACCOUNT_CONVERTING_CURRENCY });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    return dispatch({
      type: ACCOUNT_DEPOSIT,
      payload: converted,
    });
  };
};
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export { initialState };
export default accountSlice.reducer;
