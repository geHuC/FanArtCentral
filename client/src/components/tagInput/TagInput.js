import './tagInput.css'
import { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
    const [input, setInput] = useState('');
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [showError, setShowError] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        setShowError(false);
        if ((key === ',' || key === 'Enter') && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            if (trimmedInput.length < 3) {
                return setShowError(true);
            }
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    const onBlur = (e) => {
        const trimmedInput = input.trim();
        if (trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            if (trimmedInput.length < 3) {
                return setShowError(true);
            }
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }
    }
    return (
        <>
            <label className="tag-label">Tags (separate by comma ",")</label>
            <div className={`tag-input-container ${showError && 'form-input-invalid'}`}>
                {tags.map((tag, index) => (
                    <div className="input-tag" key={tag}>
                        {tag}
                        <button type="button" onClick={() => deleteTag(index)}>x</button>
                    </div>
                ))}
                <input
                    value={input}
                    placeholder="Enter a tag"
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onBlur={onBlur}
                />
            </div>
            {showError && <span className='tag-input-error'>Tag must be atleast 3 characters long</span>}
        </>
    )
}

export default TagInput