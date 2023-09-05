import { combineReducers, createStore } from "redux";

import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_PAYLOAN,
  ACCOUNT_REQUEST_LOAN,
  ACCOUNT_WITHDRAW,
  CUSTOMER_CREATE_CUSTOMER,
  CUSTOMER_UPDATE_NAME,
} from "./constant";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CUSTOMER_CREATE_CUSTOMER:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case CUSTOMER_UPDATE_NAME:
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    account: accountReducer,
    customer: customerReducer,
  })
);

const deposit = (amount) => ({ type: ACCOUNT_DEPOSIT, payload: amount });

const withdraw = (amount) => ({ type: ACCOUNT_WITHDRAW, payload: amount });

const requestLoan = (amount, purpose) => ({
  type: ACCOUNT_REQUEST_LOAN,
  payload: { amount, purpose },
});

const payLoan = () => ({ type: ACCOUNT_PAYLOAN });

const createCustomer = (fullName, nationalID) => ({
  type: CUSTOMER_CREATE_CUSTOMER,
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

const updateName = (fullName) => ({
  type: CUSTOMER_UPDATE_NAME,
  payload: fullName,
});

store.dispatch(deposit(20));
console.log(store.getState());
store.dispatch(withdraw(10));
store.dispatch(requestLoan(1000, "buy a new car"));
store.dispatch(payLoan());

store.dispatch(createCustomer("Young", 121));
console.log(store.getState());
store.dispatch(updateName("chen"));
console.log(store.getState());
