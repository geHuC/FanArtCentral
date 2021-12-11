import './profileDataBar.css'
import { Link } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai'
import FollowButton from '../../components/followButton/FollowButton.js'
import prettyNumbers from '../../utils/prettyNumbers.js';
import { useUserContext } from '../../context/UserContext.js';

const ProfileDataBar = ({ userData, username, label }) => {
    const { state: { user, isAuthenticated } } = useUserContext();
    console.log(username);
    let loggedUserProfile = false;
    if (isAuthenticated) {
        if (user.username.toLowerCase() === username.toLowerCase()) {
            loggedUserProfile = true;
        }
    }

    return (
        <div className="profile-data">
            <div className="pd-user-info">
                <div className="pd-left">
                    <img src="/static/noAvatar.png" alt="avatar" />
                </div>
                <div className="pd-right">
                    <div className="pd-name-container">
                        <span className="pd-username">{userData.username}</span>
                        {loggedUserProfile
                            ? <Link to="/settings"><AiOutlineSetting />settings</Link>
                            : isAuthenticated ? <FollowButton author={userData} /> : ''
                        }
                    </div>
                    <p className="pd-full-name">
                        <span>{userData.fullname}</span>
                    </p>
                    <div className="pd-statistics">
                        <span>{prettyNumbers(userData.submissions.length)} Submissions</span>
                        <span>{prettyNumbers(userData.submissions.reduce((a, b) => a + b.views, 0))} Submission views</span>
                        <span>{prettyNumbers(userData.followers.length)} Followers</span>
                    </div>
                </div>
            </div>
            <div className="pd-label">
                {label}
            </div>
        </div>
    )
}

export default ProfileDataBar
