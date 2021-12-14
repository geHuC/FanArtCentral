import './submit.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext.js';
import FormInput from '../../components/formInput/FormInput.js'
import TagInput from '../../components/tagInput/TagInput.js';
import submissionService from '../../services/submissionService.js';
import CategorySelector from '../../components/categorySelector/CategorySelector.js';
import DescriptionTextBox from '../../components/descriptionTextBox/DescriptionTextBox.js';

const Submit = () => {
    const { state } = useUserContext();
    const [tags, setTags] = useState([]);
    const [imageError, setImageError] = useState({});
    const [serverError, setServerError] = useState(false);
    const [rerender, setRerender] = useState(1);
    const [wait, setWait] = useState(false);

    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (wait) return;
        if (serverError) return;
        setWait(true);
        let formData = new FormData(e.currentTarget);
        formData.append('tags', JSON.stringify(tags));
        submissionService.create(formData)
            .then(data => { navigate(`/${state.user.username}/art/${data.data.slug}`) })
            .catch(err => {
                console.log(err);
                setWait(false);
            });
    }
    const imageValidator = (e) => {
        setImageError({});
        setServerError(false)
        if (e.target.files[0]) {
            if (e.target.files[0].size > 3145728) {
                setImageError({ msg: 'Pictures should be less than 3MB in size' });
                setServerError(true);
                setRerender(rerender + 1);
            }
            if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/jpg') {
                setImageError({ msg: 'Only JPG, JPEG and PNG files accepted' });
                setServerError(true);
                setRerender(rerender + 1);
            }
        }
    }
    return (
        <section className={`submit-section ${wait && 'wait'}`}>
            <div className="submit-header-container">
                <h2>Create submission:</h2>
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
                />
                <CategorySelector />
                <TagInput tags={tags} setTags={setTags} />
                <FormInput
                    classes={serverError ? 'form-input-invalid' : ''}
                    name="image"
                    type="file"
                    label="Image:"
                    errorMessage={serverError ? imageError.msg : "Please choose a valid image"}
                    required={true}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={imageValidator}
                    invalid={rerender} //hacky hack no idea why I need to go this lenght it if someone can explain please do
                />
                <DescriptionTextBox
                    name="description"
                    placeholder="Enter description here"
                    minLenght={10}
                    maxLenght={350}
                    errorMsg="Description must be atleast 10 characters long"
                    label="Description:"
                    required={true}
                />

                <button className={`submit-form-submit-button ${wait && 'block'}`} type="submit">Submit</button>
            </form>
        </section>
    )
}

export default Submit




