import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: {
    "client-id":
      "Ac8GkE-dae3hetm-wqqX8XNuNCpJCiWTgWITkUQGlhcbrHS1GrsjTPiMAnsahlxvUGo5xxzWEQbFAKjE",
    currency: "USD",
    intent: "capture",
  },
  isPending: true,
};

    const paypalSlice = createSlice({
        name: "paypal",
        initialState,
        reducers: {
            setCurrency: (state, action) => {
            state.options.currency = action.payload;
            },
            setPending: (state, action) => {
            state.isPending = action.payload;
            },
        },
    });

export const { setCurrency, setPending } = paypalSlice.actions;

export default paypalSlice.reducer;
