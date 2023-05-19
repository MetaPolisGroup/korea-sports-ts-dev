import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EAction, EStatus, IMatches } from "./type";

const initialState: IMatches = {
    home: {
        id: "",
        name: ""
    },
    away: {
        id: "",
        name: ""
    },
    league: {
        id: "",
        name: ""
    },
    id: "",
    time_status: EStatus.NO_PROCESS
};

const matchesSlice = createSlice({
    name: "matches",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(EAction.MATCHES_REQUEST, (state, action) => {
               
            })
    }
});

export const { } = matchesSlice.actions;
export default matchesSlice.reducer;
