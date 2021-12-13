import './settings.css'
import ChangeAvatar from '../../components/changeAvatar/ChangeAvatar.js'
import { useUserContext } from '../../context/UserContext.js'
import { useCallback, useEffect, useState } from 'react';
import userService from '../../services/userService.js';
import FormInput from '../../components/formInput/FormInput.js';
import DescriptionTextBox from '../../components/descriptionTextBox/DescriptionTextBox.js';
import LoadingDots from '../../components/loadintDots/LoadingDots.js';

const Settings = () => {
    const { state: { user }, dispatch } = useUserContext();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setLoading(true);
        userService.getOneById(user._id.toString())
            .then(res => {
                setUserData(res.data);
                setFullname(res.data.fullname ? res.data.fullname : '');
                setLoading(false)
            })
            .catch(err => { console.log(err); setLoading(false) })
    }, [user])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (imageError) return;

        let formData = new FormData(e.currentTarget);
        userService.updateSettings(formData)
            .then(res => {
                console.log(res.data);
                dispatch({ type: 'AVATAR-CHANGE', payload: { avatar: res.data.avatar } })
            })
            .catch(err => console.log(err))
    }
    const onChange = e => {
        setFullname(e.target.value);
    }
    if (loading) return <LoadingDots />;

    return (
        <section className="settings-section">
            <div className="vh70-box">
                <form className="settings-form" encType="multipart/form-data" onSubmit={formSubmitHandler}>
                    <ChangeAvatar imgErrorHandler={setImageError} />
                    <div className="settings-username">{userData.username}</div>
                    <FormInput
                        name="fullname"
                        label="Full Name:"
                        type="text"
                        value={fullname}
                        placeholder='Full name'
                        errorMessage='Full name must be at least 5 characters and contain only letters'
                        onChange={onChange}
                        minLength={5}
                        pattern="^[a-zA-Z ]+$"
                        required={true} />
                    <DescriptionTextBox
                        name="bio"
                        label="Bio:"
                        placeholder="Share a little something about yourself"
                        maxLenght={350}
                        errorMsg={'Description must be at most 350 characters'}
                        initialValue={userData.bio}
                    />
                    <button>Save</button>
                </form>
            </div>
        </section>
    )
}

export default Settings
