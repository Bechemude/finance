import "./Dropdown.css";

interface IDropdownProps {
    data: string[];
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
}

export default function Dropdown({
    data,
    handleChange,
    value,
    className,
}: IDropdownProps) {
    return (
        <select
            className={className}
            value={value}
            onChange={(event) => handleChange(event)}
        >
            {data.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
}
