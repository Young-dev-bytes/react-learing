import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_PAYLOAN,
  ACCOUNT_REQUEST_LOAN,
  ACCOUNT_WITHDRAW,
  ACCOUNT_CONVERTING_CURRENCY,
} from "../../constant";

const initialState = {
  balance: 1000,
  loan: 0,
  loanPurpose: "",
  currency: "USD",
  isLoading: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case ACCOUNT_WITHDRAW:
      return { ...state, balance: state.balance - action.payload };
    case ACCOUNT_REQUEST_LOAN:
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ACCOUNT_PAYLOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case ACCOUNT_CONVERTING_CURRENCY:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

const deposit = (amount, currency) => {
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

const withdraw = (amount) => ({ type: ACCOUNT_WITHDRAW, payload: amount });

const requestLoan = (amount, purpose) => ({
  type: ACCOUNT_REQUEST_LOAN,
  payload: { amount, purpose },
});

const payLoan = () => ({ type: ACCOUNT_PAYLOAN });

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan, initialState };
