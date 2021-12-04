import { useEffect, useState } from 'react';
import './formInput.css'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { invalid, classes, label, errorMessage, onChange, lastField, ...inputProps } = props;
    const [serverError, setServerError] = useState(false);
    const [defaultError, setDefaultError] = useState(errorMessage);
    //I have no freaking idea what i'm doing here
    useEffect(()=>{
        if(invalid) setServerError(true);
    },[invalid])
    const handleFocus = (e) => {
        setFocused(true);
    }
    const handleLastElement = (e) => {
        e.target.classList.remove('form-input-invalid');
        setServerError(false);
        if (lastField) setFocused(true);
    }
    return (
        <div className="form-input">
            <label htmlFor={props.name}>{label}</label>
            <input
                {...inputProps}
                className={classes}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={handleLastElement}
                focused={focused.toString()} />
            <span>{serverError ? errorMessage : defaultError}</span>
        </div>
    )
}

export default FormInput
