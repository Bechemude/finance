import { useEffect, useState } from "react";
import "./Table.css";

interface IColoredFloatProps {
    children: number;
    opacity?: number;
}

const ColoredFloat = ({ children, opacity }: IColoredFloatProps) => {
    return (
        <>
            <span>{children.toString().substring(0, 4)}</span>
            <span style={{ opacity: opacity ?? 0.4 }}>
                {children.toString().substring(4, 99)}
            </span>
        </>
    );
};

interface ITableProps {
    data: [string, number][];
    handleClick: (currency: string) => void;
}

export default function Table({ data, handleClick }: ITableProps) {
    const [pairs, setPairs] = useState(data);
    const [order, setOrder] = useState(false);

    useEffect(() => {
        setPairs(data);
    }, [data]);

    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const sortByCurrency = () => {
        const res = pairs.sort((a, b) =>
            order ? (a[0] < b[0] ? 1 : -1) : b[0] < a[0] ? 1 : -1
        );

        setPairs([...res]);
        setOrder((value) => !value);
    };

    const sortByValue = () => {
        const res = pairs.sort((a, b) => (order ? a[1] - b[1] : b[1] - a[1]));

        setPairs([...res]);
        setOrder((value) => !value);
    };

    return (
        <div className="table">
            <div className="header">
                <p onClick={sortByCurrency}>Currency</p>
                <p onClick={sortByValue}>Value</p>
            </div>
            <div className="tbody">
                {pairs.map(([currency, value]) => (
                    <div
                        className="row"
                        onClick={() => handleClick(currency)}
                        key={currency}
                    >
                        <p>{currency}</p>
                        <p>
                            <ColoredFloat>{value}</ColoredFloat>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
