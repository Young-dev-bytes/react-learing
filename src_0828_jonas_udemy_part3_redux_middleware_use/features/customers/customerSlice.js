import { CUSTOMER_CREATE_CUSTOMER, CUSTOMER_UPDATE_NAME } from "../../constant";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function customerReducer(state = initialState, action) {
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

const createCustomer = (fullName, nationalID) => ({
  type: CUSTOMER_CREATE_CUSTOMER,
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

const updateName = (fullName) => ({
  type: CUSTOMER_UPDATE_NAME,
  payload: fullName,
});

export default customerReducer;
export { createCustomer, updateName };
