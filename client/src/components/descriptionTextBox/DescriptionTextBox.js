import { useState } from 'react'
import './descriptionTextBox.css'

const DescriptionTextBox = ({ placeholder, label, maxLenght, minLenght, required, name, errorMsg, initialValue }) => {
    const [value, setValue] = useState('');
    const [symbolCount, setSymbolCount] = useState(0);
    const [error, setError] = useState(false);
    useState(() => {
        if (initialValue) {
            setValue(initialValue);
            setSymbolCount(initialValue.length);
        }
    }, [initialValue])
    const onChangeHandler = (e) => {
        if (e.target.value.length <= maxLenght) {
            setValue(e.target.value);
            setSymbolCount(e.target.value.length);
        }
    }
    const onBlurHandler = (e) => {
        if (symbolCount < minLenght) setError(true);
    }
    const onFocusHandler = (e) => {
        if (error) setError(false);
    }
    return (
        <div className="description-text-box">
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                placeholder={placeholder}
                minLength='10'
                required={required} />
            <div className="description-text-box-count-container">
                <div className="description-text-box-count-container-left">
                    {error && <span>{errorMsg}</span>}
                </div>
                <div className="description-text-box-count-container-right">
                    <span>{symbolCount}/{maxLenght}</span>
                </div>
            </div>
        </div>
    )
}

export default DescriptionTextBox
