import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload is newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload is pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity: (state, action) => {
      // payload is pizzaId
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      cartItem.quantity++;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
    },
    decreaseQuantity: (state, action) => {
      // payload is pizzaId
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      if (cartItem.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

//  ? ! i don't know how to write this, but now I got it

// ! version - simple
// export function getItemQuantity(pizzaId) {
//   return (state) => {
//     console.log(state);
//     return state.cart.cart.find((item) => item.pizzaId === pizzaId).quantity;
//   };
// }

// ! version - good
// export const getItemQuantity = (pizzaId) => {
//   return (state) =>
//     state.cart.find((item) => item.pizzaId === pizzaId)?.quantity;
// };

// ! version - final
export const getItemQuantity = (pizzaId) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;

export const getTotalCartPrice = (state) =>
  // ! remember it :
  // * state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
