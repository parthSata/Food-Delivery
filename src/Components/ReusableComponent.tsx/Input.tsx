import React from 'react'

interface InputProps {
    type: any
    className: any
    id?: any
    name?: string
    placeholder?: any
    value?: any
    onChange?: any
    radioGroup?: any
    style?: any
    checked?: any
    accept?: any
    disabled?: any
}

const Input: React.FC<InputProps> = ({ placeholder, disabled, checked, name, className, id, onChange, accept, radioGroup, style }) => {

    return (
        <input type="text" disabled={disabled} checked={checked} accept={accept} className={className} id={id} name={name} onChange={onChange} style={style} radioGroup={radioGroup} placeholder={placeholder} />
    )
}



export default Input