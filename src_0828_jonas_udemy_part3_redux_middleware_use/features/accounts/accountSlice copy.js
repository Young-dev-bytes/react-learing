const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    },
    withdraw: (state, action) => {
      return { ...state, balance: state.balance - action.payload };
    },
    requestLoan: (state, action) => {
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    },
    payLoan: (state) => {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.action;
export default accountSlice.reducers;
