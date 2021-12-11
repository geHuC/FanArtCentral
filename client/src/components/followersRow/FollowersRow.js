import { useState } from 'react'
import { Link } from 'react-router-dom';
import FollowerCard from '../followerCard/FollowerCard.js'
import './followersRow.css'

const FollowersRow = ({ followers, text }) => {
    const [shown, setShown] = useState(5);
    const showMoreHandler = (e) => {
        setShown(state => state + 10);
    }
    return (
        <div className='followers-row'>
            <div className="followers-row-text-container">
                <span className="followers-row-text">{text}:</span>
                <span className="followers-row-count">{followers.length}</span>
            </div>
            <div className="followers-row-card-container">
                {followers.slice(0,shown).map(f => <FollowerCard key={f} userId={f} />)}
                {shown < followers.length && <div className="followers-row-show-more" onClick={showMoreHandler}>show more</div>}
            </div>
        </div>
    )
}

export default FollowersRow
