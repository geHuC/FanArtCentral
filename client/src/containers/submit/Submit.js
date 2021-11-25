import axios from 'axios';
import FormInput from '../../components/formInput/FormInput.js'
import './submit.css'

const Submit = () => {
    const formHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        axios.post('http://localhost:3030/api/v1/submissions', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    }
    const inputs = [
        {
            name: 'title',
            type: 'text',
            placeholder: 'Submission Title',
            label: 'Title:',
            errorMessage: 'Title must be longer than 3 characters',
            pattern: ".{3,}",
            required: true,
        },
        {
            name: 'category',
            type: 'text',
            placeholder: 'Enter category',
            label: 'Category:',
            errorMessage: 'Please select a category',
            required: true,
        },
        {
            name: 'image',
            type: 'file',
            label: 'Image:',
            errorMessage: 'Please select an image to upload',
            required: true,
        },
    ];

    const onChange = () => {
    }
    return (
        <div>
            <form onSubmit={formHandler} encType="multipart/form-data">
                {inputs.map(input => <FormInput key={input.name} {...input} onChange={onChange} />)}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Submit




