import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.freecurrencyapi.com/";
const apikey = "xNd2ppDZpoxU1lDeGw6AWU2vitgl4L88f3jPDEBr";

//  ?apikey=xNd2ppDZpoxU1lDeGw6AWU2vitgl4L88f3jPDEBr
//  &currencies=USD
//  &base_currency=RUB

// /latest
// ?apikey=xNd2ppDZpoxU1lDeGw6AWU2vitgl4L88f3jPDEBr
// &currencies=
// &base_currency=RUB

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getCurrencies: builder.query<any, any>({
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
