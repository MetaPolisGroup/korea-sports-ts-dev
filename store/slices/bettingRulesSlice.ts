import { createSlice } from "@reduxjs/toolkit";

export interface IBettingRules {
  [props: string]: any;
}

const initialState: IBettingRules = {
  rules: {},
};

const bettingRulesSlice = createSlice({
  name: "bettingRules",
  initialState,
  reducers: {
    setBettingRules: (state, action) => {
      const { rules } = action.payload;
      state.rules = rules;
    },
  },
});

export const { setBettingRules } = bettingRulesSlice.actions;

export default bettingRulesSlice.reducer;
