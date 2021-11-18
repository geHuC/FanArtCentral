import { useState } from 'react';
import './formInput.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, lastField, ...inputProps } = props;
    console.log(inputProps);
    const handleFocus = (e) => {
        setFocused(true);
    }
    const handleLastElement = (e) => {
        if (lastField) setFocused(true);
    }
    return (
        <div className="form-input">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={handleLastElement}
                focused={focused.toString()} />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput
