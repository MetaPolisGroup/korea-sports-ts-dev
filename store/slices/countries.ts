import { createSlice } from "@reduxjs/toolkit";

interface ICountries {
  countries: { id: string; imgUrl: string; name: string }[];
  leagues: {
    cc: string;
    id: string;
    korean_name: string;
    name: string;
    sport_id: string;
  }[];
  teams: { id: string; korea_name: string; name: string; sport_id: string }[];
}

const initialState: ICountries = {
  countries: [],
  leagues: [],
  teams: [],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountries: (state, action) => {
      state.countries = action.payload;
    },
    addLeagues: (state, action) => {
      state.leagues = action.payload;
    },
    addTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { addCountries, addLeagues, addTeams } = countriesSlice.actions;

export default countriesSlice.reducer;
