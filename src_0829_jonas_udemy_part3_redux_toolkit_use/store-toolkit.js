import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice-toolkit";
import customerReducer from "./features/customers/customerSlice-toolkit";

const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});

export default store;
