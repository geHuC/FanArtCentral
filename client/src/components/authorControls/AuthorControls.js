import './authorControls.css'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import ConfirmBox from '../confirmBox/ConfirmBox.js';
import submissionService from '../../services/submissionService.js';
import { useNavigate } from 'react-router-dom';

const AuthorControls = ({id}) => {
    const [confirm, setConfirirm] = useState(false);
    const [wait, setWait] = useState(false);
    const navigate = useNavigate()
    const deleteBtnHandler = (e) => {
        setConfirirm(!confirm);
    }
    const hideConfirm = (e) =>{
        setConfirirm(false)
    }
    const deleteSubmission = (e)=>{
        setWait(true);
        submissionService.deleteOne(id)
        .then(res => navigate('/'))
        .catch(err => console.log(err))
        setWait(false);
    }
    return (
        <div className={`author-contols ${wait && 'wait'}`} onMouseLeave={hideConfirm}>
            <AiOutlineEdit className="author-contols-button AiOutlineEdit"/>
            <AiOutlineDelete 
            className="author-contols-button AiOutlineDelete"
            onClick={deleteBtnHandler}/>
            
            {confirm && <ConfirmBox 
            classes="delete-confirm-box"
            heading="Are you sure?"
            subheading="Deleting an item cannot be reversed" 
            confirmBtn="Delete" 
            cancelBtn="Cancel"
            cancelClick={hideConfirm}
            confirmClick={deleteSubmission}
            />}
        </div>
    )
}


export default AuthorControls
