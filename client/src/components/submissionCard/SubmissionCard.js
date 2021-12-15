import './submissionCard.css';
import { Link } from 'react-router-dom';

import { AiFillEye } from 'react-icons/ai';
import prettyNumbers from '../../utils/prettyNumbers.js';
import FavouriteButton from '../favouriteButton/FavouriteButton.js';
import UsernameHoverCard from '../usernameHoverCard/UsernameHoverCard.js';

const SubmissionCard = (props) => {
    return (
        <div className="submission-card">
            <div className="submission-card-img">
                <img src={props.thumbUrl} alt="art" />
            </div>
            <div className="submission-card-overlay">

                <Link className="submission-card-link" to={`/${props.author.username}/art/${props.slug}`} />
                <div className="submission-card-left">
                    <div className="submission-card-left-container">
                        <span className="submission-card-title">{props.title}</span>
                        <div className="submission-card-user">
                            <Link to={`/${props.author.username}`}><img src={props.author.avatar} alt="avatar" /></Link>
                            <UsernameHoverCard username={props.author.username} externalClass="submission-card-name submission-card-name-color"
                            externalElipsColor="submission-card-name-color" />
                            {/* <Link to={`/${props.author.username}`} className="submission-card-name">{props.author.username}</Link> */}
                        </div>
                    </div>
                </div>
                <div className="submisssion-card-right">
                    <div className="submission-card-right-container">
                        <div className="submission-card-views"> <AiFillEye />{prettyNumbers(props.views)}</div>
                        <FavouriteButton
                            favourites={props.favourites}
                            postId={props._id}
                            author={props.author}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionCard


