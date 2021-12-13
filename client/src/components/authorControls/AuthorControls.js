import './authorControls.css'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import ConfirmBox from '../confirmBox/ConfirmBox.js';
import submissionService from '../../services/submissionService.js';
import { useNavigate } from 'react-router-dom';
import EditDialog from '../editDialog/EditDialog.js';

const AuthorControls = ({ id, data, setData }) => {
    const [delDialog, setDelDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false)
    const [wait, setWait] = useState(false);
    const navigate = useNavigate()

    const deleteBtnHandler = (e) => {
        setDelDialog(state => !state);
    }
    const editBtnHandler = (e) => {
        setEditDialog(state => !state)
    }
    const hideDelDialog = (e) => {
        setDelDialog(false);
    }
    const hideEditDialog = (e) => {
        setEditDialog(false);
    }
    const deleteSubmission = (e) => {
        setWait(true);
        submissionService.deleteOne(id)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
        setWait(false);
    }
    return (
        <div className={`author-contols ${wait && 'wait'}`} onMouseLeave={hideDelDialog}>
            <AiOutlineEdit
                className="author-contols-button AiOutlineEdit"
                onClick={editBtnHandler}
            />

            {editDialog && <EditDialog data={data} hideHandler={hideEditDialog} setData={setData}/>}

            <AiOutlineDelete
                className="author-contols-button AiOutlineDelete"
                onClick={deleteBtnHandler} />

            {delDialog && <ConfirmBox
                classes="delete-confirm-box"
                heading="Are you sure?"
                subheading="Deleting an item cannot be reversed"
                confirmBtn="Delete"
                cancelBtn="Cancel"
                cancelClick={hideDelDialog}
                confirmClick={deleteSubmission}
            />}
        </div>
    )
}


export default AuthorControls
