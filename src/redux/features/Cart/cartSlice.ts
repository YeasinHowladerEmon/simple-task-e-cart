import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../Product/productSlice";

interface ICartState {
  items: {
    product: IProduct;
    quantity: number;
  }[];
}

const initialState: ICartState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeOneFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .map(item => {
          if (item.product.id === action.payload) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter(
          (item): item is { product: IProduct; quantity: number } =>
            item !== null
        );
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
    },
    clearCart: state => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  clearCart,
  removeOneFromCart,
  removeProductFromCart
} = cartSlice.actions;
export default cartSlice.reducer;


// const itemIndex = state.items.findIndex(
//     (item) => item.product.id === action.payload
//   );
//   if (itemIndex >= 0) {
//     const item = state.items[itemIndex];
//     if (item.quantity > 1) {
//       item.quantity -= 1; // Decrease quantity if more than 1
//     } else {
//       state.items.splice(itemIndex, 1); // Remove if only 1 is left
//     }
//   }
