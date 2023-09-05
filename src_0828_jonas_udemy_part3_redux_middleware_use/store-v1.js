import { combineReducers, createStore, applyMiddleware } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({
    account: accountReducer,
    customer: customerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(deposit(20));
// console.log(store.getState());
// store.dispatch(withdraw(10));
// store.dispatch(requestLoan(1000, "buy a new car"));
// store.dispatch(payLoan());

// store.dispatch(createCustomer("Young", 121));
// console.log(store.getState());
// store.dispatch(updateName("chen"));
// console.log(store.getState());

export default store;
