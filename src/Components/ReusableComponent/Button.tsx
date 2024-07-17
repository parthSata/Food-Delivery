import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    className: string;
    onClick?: any
    style?: any
    disabled?:any
}


const Button: React.FC<ButtonProps> = ({ children, className, onClick, style,disabled }) => {
    return (
        <button className={className} style={style} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;