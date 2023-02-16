import { Table, Dropdown } from "../../shared/ui";
import { useAppSelector, useAppDispatch } from "../../shared/hooks";
import { selectCurrency, setCurrency } from "./currenciesTableSlice";
import "./CurrenciesTable.css";

export default function CurrenciesTable({
    data,
}: {
    data: { [key: string]: number };
}) {
    const currency = useAppSelector(selectCurrency);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(setCurrency({ currency: event.target.value }));
    const handleClick = (currency: string) =>
        dispatch(setCurrency({ currency }));

    const currenciesList = Object.keys(data);

    const currenciesPairs = Object.entries(data).filter(
        (pair) => pair[0] !== currency
    );

    return (
        <>
            <Dropdown
                data={currenciesList}
                value={currency}
                handleChange={handleChange}
                className="table_dropdown"
            />
            <Table data={currenciesPairs} handleClick={handleClick} />
        </>
    );
}
