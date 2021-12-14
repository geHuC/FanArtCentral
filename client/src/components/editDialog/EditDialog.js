import './editDialog.css'
import { useState } from 'react';
import { useUserContext } from '../../context/UserContext.js';
import { useNavigate } from 'react-router-dom';
import submissionService from '../../services/submissionService.js';
import FormInput from '../formInput/FormInput.js';
import CategorySelector from '../categorySelector/CategorySelector.js';
import TagInput from '../tagInput/TagInput.js';
import DescriptionTextBox from '../descriptionTextBox/DescriptionTextBox.js';

const EditDialog = ({ data, hideHandler, setData }) => {
    const { state } = useUserContext();
    const [tags, setTags] = useState(data.tags);
    const navigate = useNavigate();

    const backgroundClick = (e) => {
        if(e.currentTarget === e.target){
            hideHandler();
        }
    }
    const formHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        formData.append('tags', JSON.stringify(tags));
        formData.append('slug', data.slug);
        submissionService.update(data._id, Object.fromEntries(formData))
            .then(res => {
                if (res.data.slug === data.slug) {
                    setData(res.data)
                }
                navigate(`/${state.user.username}/art/${res.data.slug}`, { replace: true })
                hideHandler();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="edit-dialog-container" onClick={backgroundClick}>
            <div className='edit-dialog-box'>
                <div className="submit-header-container">
                    <h2>Edit submission:</h2>
                </div>
                <form className="submit-form" onSubmit={formHandler} encType="multipart/form-data">
                    <FormInput
                        name="title"
                        type="text"
                        placeholder="Submission Title"
                        label="Title:"
                        errorMessage="Title must be longer than 3 characters"
                        required={true}
                        pattern=".{3,}"
                        defaultValue={data.title}
                    />
                    <CategorySelector initialValue={data.category} />
                    <TagInput tags={tags} setTags={setTags} />
                    <DescriptionTextBox
                        name="description"
                        placeholder="Enter description here"
                        minLenght={10}
                        maxLenght={350}
                        errorMsg="Description must be atleast 10 characters long"
                        label="Description:"
                        required={true}
                        initialValue={data.description}
                    />

                    <button className="submit-form-submit-button" type="submit">Submit</button>
                </form>
                <span className="edit-dialog-cancel" onClick={hideHandler}>Cancel</span>
            </div>
        </div>
    )
}

export default EditDialog
