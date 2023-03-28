import { useEffect, useState } from "react";
import { Dropdown } from "shared/ui";
import "./Converter.css";
import { currencyDict } from "shared/ui/dictionary";
import { useGetCurrenciesQuery } from "shared/api";
import { ICurrencies } from "shared/types"

export default function Converter({ data }: ICurrencies) {
  const currenciesList = Object.keys(data);

  const [inputValue, setInputValue] = useState(1);
  const [currencyFrom, setCurrencyFrom] =
    useState<keyof typeof currencyDict>("RUB");
  const [currencyTo, setCurrencyTo] =
    useState<keyof typeof currencyDict>("USD");
  const [outputValue, setOutputValue] = useState(0);
  // TODO: add geo for currencyFrom

  const { data: currencies, isSuccess, isLoading } = useGetCurrenciesQuery({
    currencies: currencyTo,
    base_currency: currencyFrom,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  const handleChangeCurrencyFrom = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrencyFrom(
      event.target.value as keyof typeof currencyDict
    );
  };

  const handleChangeCurrencyTo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrencyTo(event.target.value as keyof typeof currencyDict);
  };

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  const convertCurrency = () => {
    currencies?.data &&
      setOutputValue(inputValue * currencies.data[currencyTo]);
  };

  useEffect(() => {
    isSuccess && convertCurrency();
  }, [currencies]);

  return (
    <div className="converter">
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
      />
      <div>
        <Dropdown
          data={currenciesList}
          value={currencyFrom}
          handleChange={handleChangeCurrencyFrom}
        />
        <button className="button-swap" onClick={handleSwap}>
          Swap
        </button>
        <Dropdown
          data={currenciesList}
          value={currencyTo}
          handleChange={handleChangeCurrencyTo}
        />
      </div>
      <p className="total">Total:</p>
      {isLoading ? <p className="value">Loading...</p>
        : (
          <div className="total-value">
            <p className="value">{Math.round(outputValue * 100) / 100}</p>
            <p className="value">{currencyDict[currencyTo]}</p>
          </div>)
      }
      <button onClick={convertCurrency}>Convert</button>
    </div>
  );
}
