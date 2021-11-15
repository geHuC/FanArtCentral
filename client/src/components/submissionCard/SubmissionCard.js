import './submissionCard.css';

const SubmissionCard = () => {
    return (
        <div className="submission-card">
            <div className="submission-card-img">
                <img src="" alt="art" />
            </div>
            <div className="subsmission-card-overlay">
                <div className="submission-card-left">
                    <img src="" alt="avatar" />
                    <span className="submission-card-name">John Doe</span>
                </div>
                <div className="submisssion-card-right">
                    <div className="submission-card-views">123</div>
                    <div className="submission-card-favourites">2</div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionCard


