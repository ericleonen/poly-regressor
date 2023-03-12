interface props {
    label: string,
    min: number,
    max: number,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    base10?: boolean
};

const SettingsSection = ({ label, min, max, value, setValue, base10 }: props) => {
    return (
        <div className="pt-2">
            <p className="w-full text-center"><span className="font-medium text-gray-800">{label}</span> = {base10 ? (value < 0 ? 1 / 10 ** -value : 10 ** value) : value}</p>
            <input 
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={({target}) => setValue(parseInt(target.value))}
            />
        </div>
    );
};

export default SettingsSection;