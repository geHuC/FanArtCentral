import './changeAvatar.css'
import { useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai'
import { useUserContext } from '../../context/UserContext.js'

const ChangeAvatar = ({imgErrorHandler}) => {
    const { state: { user } } = useUserContext();
    const inputFile = useRef(null);
    const [currentAvatar, setCurrentAvatar] = useState(user.avatar)
    const [imageError, setImageError] = useState({});
    const onClickHandler = () => {
        inputFile.current.click();
    };

    const imageSelectHandler = (e) => {
        setImageError({});
        imgErrorHandler(false);
        if (e.target.files[0]) {
            if (e.target.files[0].size > 3145728) {
                imgErrorHandler(true);
                return setImageError({ msg: 'Pictures should be less than 3MB in size' });
            }
            if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/jpg') {
                imgErrorHandler(true);
                return setImageError({ msg: 'Only JPG, JPEG and PNG files accepted' });
            }
            setCurrentAvatar(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className='change-avatar-container'>
            <input
                style={{ display: "none" }}
                ref={inputFile}
                onChange={imageSelectHandler}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="avatar"
            />
            <div className={`avatar-container ${imageError.msg && "avatar-error"}`} onClick={onClickHandler}>
                <img src={currentAvatar} alt="avatar" />
                <AiFillEdit className={`avatar-edit-badge ${imageError.msg && "avatar-error"}`} />
            </div>
            {imageError.msg && <span className='avatar-error-msg'>{imageError.msg}</span>}
        </div>
    )
}

export default ChangeAvatar
