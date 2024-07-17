import React from 'react'

interface InputProps {
    type: string
    className: any
    id?: any
    name?: string
    placeholder?: any
    value?: any
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    radioGroup?: any
    style?: any
    checked?: any
    accept?: any
    disabled?: any
}

const Input: React.FC<InputProps> = ({ type, placeholder, disabled, checked, name, className, id, onChange, accept, radioGroup, style }) => {

    return (
        <input type={type} disabled={disabled} checked={checked} accept={accept} className={className} id={id} name={name} onChange={onChange} style={style} radioGroup={radioGroup} placeholder={placeholder} />
    )
}



export default Input