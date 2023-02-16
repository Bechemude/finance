import { useEffect, useState } from "react";
import "./App.css";
import { Converter, CurrenciesTable } from "./features";
import { useGetCurrenciesQuery } from "./shared/api";
// import { currencies } from "./shared/mocks";

function App() {
    const {
        data: currencies,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCurrenciesQuery({});
    // const data: { [key: string]: number } = currencies;

    if (isLoading) {
        return <p>Loading ...</p>;
    }
    if (isError) {
        return <p>{error.toString()}</p>;
    }

    return (
        <div className="App">
            {isSuccess && (
                <>
                    <Converter data={currencies.data} />
                    <CurrenciesTable data={currencies.data} />
                </>
            )}
        </div>
    );
}

export default App;
// filters icons in header
// datepicker
// api convert request
// config
// swap button icon
// disable convert
// convert on blur
// selected value in the table
// table animation
// swap animation
