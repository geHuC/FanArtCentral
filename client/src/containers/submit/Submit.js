import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import FormInput from '../../components/formInput/FormInput.js'
import TagInput from '../../components/tagInput/TagInput.js';
import UserContext from '../../context/UserContext.js';
import './submit.css'
import submissionService from '../../services/submissionService.js';

const Submit = () => {
    const { state } = useContext(UserContext);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        formData.append('tags', JSON.stringify(tags));
        submissionService.create(formData)
            .then(data => navigate(`/${state.user.username}/art/${data.data.slug}`))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={formHandler} encType="multipart/form-data">
                <FormInput
                    name="title"
                    type="text"
                    placeholder="Submission Title"
                    label="Title:"
                    errorMessage="Title must be longer than 3 characters"
                    required={true}
                    pattern=".{3,}"
                />
                <FormInput
                    name="category"
                    type="text"
                    placeholder="Enter category"
                    label="Category:"
                    errorMessage="Please select a category"
                    required={true}
                />
                <TagInput tags={tags} setTags={setTags} />
                <FormInput
                    name="description"
                    type="text"
                    placeholder="Enter description"
                    label="Description:"
                    errorMessage="Please enter a description"
                    required={true}
                />
                <FormInput
                    name="image"
                    type="file"
                    label="Image:"
                    errorMessage="Please choose a valid image"
                    required={true}
                    accept="image/png, image/jpeg, image/jpg"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Submit




