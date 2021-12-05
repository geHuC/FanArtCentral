import { useState } from 'react'
import './descriptionTextBox.css'

const DescriptionTextBox = () => {
    const [value, setValue] = useState('');
    const [symbolCount, setSymbolCount] = useState(0);
    const [error, setError] = useState(false)

    const onChangeHandler = (e) => {
        if (e.target.value.length <= 350) {
            setValue(e.target.value);
            setSymbolCount(e.target.value.length);
        }
    }
    const onBlurHandler = (e) => {
        if (symbolCount < 10) setError(true);
    }
    const onFocusHandler = (e) => {
        if (error) setError(false);
    }
    return (
        <div className="description-text-box">
            <label htmlFor="description">Description:</label>
            <textarea
                name="description"
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                placeholder="Enter description here"
                minLength={10}
                required={true} />
            <div className="description-text-box-count-container">
                <div className="description-text-box-count-container-left">
                    {error && <span>Description must be atleast 10 characters long</span>}
                </div>
                <div className="description-text-box-count-container-right">
                    <span>{symbolCount}/350</span>
                </div>
            </div>
        </div>
    )
}

export default DescriptionTextBox
