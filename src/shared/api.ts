import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICurrencies } from "../shared/types"

const baseUrl = "https://api.freecurrencyapi.com/";
const apikey = "xNd2ppDZpoxU1lDeGw6AWU2vitgl4L88f3jPDEBr";
// TODO: apiket to .env

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<ICurrencies, { currencies?: string; base_currency?: string }>({
      query: (args) => {
        const { currencies, base_currency } = args;
        return {
          url: "/v1/latest",
          params: { apikey, currencies, base_currency },
        };
      },
    }),
  }),
});

export const { useGetCurrenciesQuery } = apiSlice;
