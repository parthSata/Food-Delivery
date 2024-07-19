import React from 'react';

interface InputProps {
    type: string;
    className?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number | readonly string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
    checked?: boolean;
    accept?: string;
    disabled?: boolean;
}


const Input: React.FC<InputProps> = ({ type, placeholder, disabled, checked, name, className, id, onChange, accept, style, value }) => {
    return (
        <input
            type={type}
            disabled={disabled}
            checked={checked}
            accept={accept}
            className={className}
            id={id}
            name={name}
            onChange={onChange}
            style={style}
            placeholder={placeholder}
            value={value}
        />
    );
};

export default Input;
