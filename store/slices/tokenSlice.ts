import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
    access_token: string | null;
}

const initialState: TokenState = {
    access_token: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.access_token = action.payload;
        },
        clearAccessToken(state) {
            state.access_token = null;
        },
    },
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;
