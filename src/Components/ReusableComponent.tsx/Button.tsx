import React from 'react';
interface ButtonProps {
    children: React.ReactNode;
    className: string;
    onClick?: any
    style?: any
}


const Button: React.FC<ButtonProps> = ({ children, className, onClick, style }) => {
    return (
        <button className={className} style={style} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;