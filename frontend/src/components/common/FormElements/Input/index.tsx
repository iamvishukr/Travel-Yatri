import React from 'react'
import classNames from 'classnames';
import "./style.scss"


import { useFormikContext } from 'formik';


interface IInput {
    name: string;
    label?: string;
    type: string;
    className?: string,
    value?: string | number
    placeholder?: string,
    [key: string]: any,

}

const Input: React.FC<IInput> = ({ name, label, type, className, value, placeholder, ...props }) => {

    const { handleBlur, handleChange, values } = useFormikContext()
    return (
        <div className={classNames(['ty-input', className])}>
            {!!label && <label>{label}</label>}
            <input onChange={handleChange} onBlur={handleBlur} name={name} type={type} placeholder={placeholder} value={value ?? (values as { [key: string]: string })?.[name]} {...props} />
        </div>
    )
}

export default Input