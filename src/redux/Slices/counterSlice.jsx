import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    incrementbyAmount: (state, action) => {
      state.count += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, () => {
      console.log("Pending");
    });

    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.count += action.payload;
    });
  },
});

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return amount;
  }
);

export const { increment, decrement, incrementbyAmount } = counterSlice.actions;

// export { incrementAsync };

export default counterSlice.reducer;
