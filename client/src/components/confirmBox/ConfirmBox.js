import './confirmBox.css'

const ConfirmBox = (props) => {
    return (
        <div className="confirm-box-container">
            <div className={`${props.classes} confirm-box`}>
                <h2>{props.heading}</h2>
                <p>{props.subheading}</p>
                <div className="confirm-box-buttons">
                    <button className="confirm-box-button-cancel" onClick={props.cancelClick}>{props.cancelBtn}</button>
                    <button className="confirm-box-button-confirm" onClick={props.confirmClick}>{props.confirmBtn}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox
