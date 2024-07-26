import React, { useState, useEffect } from 'react';
import { Input } from './ui/input'; // Assuming you're using a UI library like shadcn/ui

interface CustomColorInputProps {
    value: string;
    onChange: (color: string) => void;
}

const CustomColorInput: React.FC<CustomColorInputProps> = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        setInputValue(e.target.value);
        // Only call onChange if it's a valid hex color
        if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
            onChange(newValue);
        }
    };

    const handleBlur = () => {
        // If the input is not a valid hex color, revert to the original value
        if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
            setInputValue(value);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="color"
                value={value}
                onChange={handleInputChange}
                className="h-8 w-8 cursor-pointer"
            />
            <Input
                type="text"
                className='h-8'
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="#RRGGBB"
            />
        </div>
    );
};

export default CustomColorInput;