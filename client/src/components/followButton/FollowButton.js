import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext.js';
import './followButton.css'

const FollowButton = ({ followers }) => {
    const [follow, setFollow] = useState(false);
    const [followSymbol, setFollowSymbol] = useState('✓');
    const { state: { user: { _id } } } = useContext(UserContext);
    useEffect(() => {
        if (_id) {
            if (followers.some(x => x === _id)) {
                setFollow(true);
            }
        }
    }, [followers, _id]);

    const mouseOverHandler = (e) => {
        setFollowSymbol('✕');
    }
    const mouseLeaveHandler = (e) => {
        setFollowSymbol('✓');
    }
    return (
        <>
            {follow
                ? <button className="follow-button follow-button-following" onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}> {followSymbol} Following</button>
                : <button className="follow-button follow-button-not-following"> +Follow</button>
            }
        </>
    )
}

export default FollowButton
