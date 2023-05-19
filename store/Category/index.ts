import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ECategories } from "./type";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    category: {
      id: ECategories.SOCCER,
      src: "/images/games/ball-icon_inactive.svg",
    },
  },
  reducers: {
    getCategory: (state, action: PayloadAction<{ id: any; src: string }>) => {
      state.category.id = action.payload.id;
      state.category.src = action.payload.src;
    },
  },
});

export const { getCategory } = categorySlice.actions;
export default categorySlice.reducer;
