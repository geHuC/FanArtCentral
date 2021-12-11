import './submissionsRow.css'
import { Link } from 'react-router-dom'
import SubmissionCard from '../submissionCard/SubmissionCard.js'

const SubmissionsRow = ({userData, type}) => {
    return (
        <div className="p-latest-submissions">
            <div className="text">
                <span>Latest {type}:</span>
                {userData[type].length > 0 && <Link to={`/${userData.username}/${type}`} state={{ userData }}>(see all)</Link>}
            </div>
            <div className="p-latest-submissions-row">
                {userData[type].length > 0
                    ? userData[type].slice(0, 4).map(submission => <SubmissionCard key={submission._id} {...submission} />)
                    : <div className="p-latest-submissions-nothing">{userData.username} doesn't have any {type} yet.</div>
                }
            </div>
        </div>
    )
}

export default SubmissionsRow
