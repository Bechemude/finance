import { useEffect, useState } from "react";
import { Dropdown } from "../../shared/ui";
import "./Converter.css";
import { currencyDict } from "../../shared/ui/dictionary";
import { useGetCurrenciesQuery } from "../../shared/api";

interface IConverterProps {
  data: { [key: string]: number };
}

export default function Converter({ data }: IConverterProps) {
  const currenciesList = Object.keys(data);

  const [inputValue, setInputValue] = useState(1);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
    useState<keyof typeof currencyDict>("RUB");
  const [selectedCurrencyTo, setSelectedCurrencyTo] =
    useState<keyof typeof currencyDict>("USD");
  const [outputValue, setOutputValue] = useState(0);

  const { data: currencies, isSuccess, isLoading } = useGetCurrenciesQuery({
    currencies: selectedCurrencyTo,
    base_currency: selectedCurrencyFrom,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  const handleSelectChangeFrom = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrencyFrom(
      event.target.value as keyof typeof currencyDict
    );
  };

  const handleSelectChangeTo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrencyTo(event.target.value as keyof typeof currencyDict);
  };

  const handleSwap = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  const convertCurrency = () => {
    setOutputValue(inputValue * currencies.data[selectedCurrencyTo]);
  };

  useEffect(() => {
    isSuccess && convertCurrency();
  }, [currencies]);

  return (
    <div className="converter">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>
        <Dropdown
          data={currenciesList}
          value={selectedCurrencyFrom}
          handleChange={handleSelectChangeFrom}
        />
        <button className="button-swap" onClick={handleSwap}>
          Swap
        </button>
        <Dropdown
          data={currenciesList}
          value={selectedCurrencyTo}
          handleChange={handleSelectChangeTo}
        />
      </div>
      <p className="total">Total:</p>
      {isLoading ? <p className="value">Loading...</p>
        : (
          <div className="total-value">
            <p className="value">{Math.round(outputValue * 100) / 100}</p>
            <p className="value">{currencyDict[selectedCurrencyTo]}</p>
          </div>)
      }
      <button onClick={convertCurrency}>Convert</button>
    </div>
  );
}
