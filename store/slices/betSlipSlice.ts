import { createSlice } from "@reduxjs/toolkit";

import { isEmpty } from "lodash";

export interface BetSlipTypes {
  betsData: any[];
  team: string;
  leagueName: string;
  odd: number;
  isOpen: boolean;
  totalOdds: number;
  totalBet: number;
  potentialWin: number;
  showBet: boolean | undefined;
}

const initialState: BetSlipTypes = {
  betsData: [],
  team: "",
  odd: 0,
  leagueName: "",
  isOpen: false,
  totalOdds: 0,
  totalBet: 0,
  potentialWin: 0,
  showBet: undefined,
};

const betSlipSlice = createSlice({
  name: "betSlipSlice",
  initialState: initialState,
  reducers: {
    setBetSlip: (state, action) => {
      const persistedState = localStorage
        ? localStorage.getItem("persist:root")
        : null;
      const getBettingRulesLocalStore = persistedState
        ? JSON.parse(persistedState).bettingRules
        : null;
      const rules = JSON.parse(getBettingRulesLocalStore).rules;
      const dataExits = state.betsData.find(
        (betData) => betData.id === action.payload.id
      );

      if (isEmpty(dataExits)) {
        state.betsData.push(action?.payload);

        if (
          rules?.betting_rules?.bonus?.available &&
          state.betsData.length >= 3
        ) {
          if (state.betsData.length >= 3 && state.betsData.length < 5) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.three
            ).toFixed(2);
          } else if (state.betsData.length >= 5 && state.betsData.length < 7) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.five
            ).toFixed(2);
          } else if (state.betsData.length >= 7) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.seven
            ).toFixed(2);
          }
        } else {
          state.totalOdds = state.betsData.reduce(
            (accumalator, currentValue) => {
              return (accumalator *= +currentValue.odd.odds).toFixed(2);
            },
            1
          );
        }

        state.potentialWin = +(state.totalBet * state.totalOdds).toFixed(2);
      } else {
        if (
          state.betsData.find(
            (betData) => betData.odd.id === action.payload.odd.id
          )
        ) {
          state.betsData = state.betsData.filter(
            (betData) => betData.odd.id !== action.payload.odd.id
          );
        }
        const index = state.betsData.findIndex(
          (betData) => betData.id === dataExits.id
        );
        state.betsData[index] = action.payload;
        if (
          rules?.betting_rules?.bonus?.available &&
          state.betsData.length >= 3
        ) {
          if (state.betsData.length >= 3 && state.betsData.length < 5) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.three
            ).toFixed(2);
          } else if (state.betsData.length >= 5 && state.betsData.length < 7) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.five
            ).toFixed(2);
          } else if (state.betsData.length >= 7) {
            state.totalOdds = +(
              state.betsData.reduce((accumalator, currentValue) => {
                return (accumalator *= +currentValue.odd.odds);
              }, 1) * +rules?.betting_rules?.bonus?.seven
            ).toFixed(2);
          }
        } else {
          state.totalOdds = state.betsData.reduce(
            (accumalator, currentValue) => {
              return (accumalator *= +currentValue.odd.odds).toFixed(2);
            },
            1
          );
        }
        state.potentialWin = +(state.totalBet * state.totalOdds).toFixed(2);
      }
      if (isEmpty(state.betsData)) {
        state.isOpen = false;
        state.showBet = undefined;
      } else {
        state.isOpen = true;
      }
    },

    toggleShowBetSlip: (state, action) => {
      state.isOpen = action.payload;
      state.showBet = action.payload;
    },

    removeItemCart: (state, action) => {
      state.betsData = state.betsData.filter(
        (betData) => betData?.odd.id !== action.payload.id
      );
      const persistedState = localStorage
        ? localStorage.getItem("persist:root")
        : null;
      const getBettingRulesLocalStore = persistedState
        ? JSON.parse(persistedState).bettingRules
        : null;
      const rules = JSON.parse(getBettingRulesLocalStore).rules;
      if (rules?.betting_rules?.bonus?.available) {
        if (state.betsData.length >= 3 && state.betsData.length < 5) {
          state.totalOdds = +(
            state.betsData.reduce((accumalator, currentValue) => {
              return (accumalator *= +currentValue.odd.odds);
            }, 1) * rules?.betting_rules?.bonus?.three
          ).toFixed(2);
        } else if (state.betsData.length >= 5 && state.betsData.length < 7) {
          state.totalOdds = +(
            state.betsData.reduce((accumalator, currentValue) => {
              return (accumalator *= +currentValue.odd.odds);
            }, 1) * rules?.betting_rules?.bonus?.five
          ).toFixed(2);
        } else if (state.betsData.length >= 7) {
          state.totalOdds = +(
            state.betsData.reduce((accumalator, currentValue) => {
              return (accumalator *= +currentValue.odd.odds);
            }, 1) * rules?.betting_rules?.bonus?.seven
          ).toFixed(2);
        }
      } else {
        state.totalOdds = state.betsData.reduce((accumalator, currentValue) => {
          return (accumalator *= +currentValue.odd.odds).toFixed(2);
        }, 1);
      }

      state.potentialWin = +(state.totalBet * state.totalOdds).toFixed(2);
      state.totalOdds = state.betsData.reduce((accumalator, currentValue) => {
        return (accumalator *= +currentValue.odd.odds).toFixed(2);
      }, 1);
      if (isEmpty(state.betsData)) {
        state.isOpen = false;
        state.totalOdds = 0;
        state.totalBet = 0;
      }
    },

    setTotalBet: (state, action) => {
      state.totalBet = +action.payload;
      state.potentialWin = +(state.totalBet * state.totalOdds).toFixed(2);
    },

    addTotalValueBet: (state, action) => {
      state.totalBet = state.totalBet + action.payload;
      state.potentialWin = +(state.totalBet * state.totalOdds).toFixed(2);
    },

    clearBetSlip: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  setBetSlip,
  toggleShowBetSlip,
  removeItemCart,
  setTotalBet,
  addTotalValueBet,
  clearBetSlip,
} = betSlipSlice.actions;
export default betSlipSlice.reducer;
