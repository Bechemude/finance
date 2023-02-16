import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../shared/store";

export interface ICurrenciesTableState {
    currency: string;
}

const initialState: ICurrenciesTableState = {
    currency: "USD",
};

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (
            state,
            { payload: { currency } }: PayloadAction<ICurrenciesTableState>
        ) => {
            state.currency = currency;
        },
    },
});

export const { setCurrency } = currencySlice.actions;

export const selectCurrency = (state: RootState) => state.currency.currency;

export default currencySlice.reducer;
