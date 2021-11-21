import './submissionCard.css';

const SubmissionCard = (props) => {
    return (
        <div className="submission-card">
            <div className="submission-card-img">
                <img src={props.img} alt="art" />
            </div>
            <div className="submission-card-overlay">
                <div className="submission-card-left">
                    <div className="submission-card-left-container">
                        <span className="submission-card-title">This is a title adsfasdf asdf asdfasdf</span>
                        <div className="submission-card-user">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
                            <span className="submission-card-name">John Doe</span>
                        </div>
                    </div>
                </div>
                <div className="submisssion-card-right">
                    <div className="submission-card-right-container">
                        <div className="submission-card-views">123</div>
                        <div className="submission-card-favourites">2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionCard


