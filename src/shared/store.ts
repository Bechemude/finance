import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currenciesTable/currenciesTableSlice";
import { apiSlice } from "./api";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
