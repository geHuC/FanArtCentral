import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillEye, AiOutlineStar } from 'react-icons/ai';
import TimeAgo from 'timeago-react';
import './details.css'
import AuthorControls from '../../components/authorControls/AuthorControls.js';
import FollowButton from '../../components/followButton/FollowButton.js';
import submissionService from '../../services/submissionService.js';
import UserContext from '../../context/UserContext.js';

const Details = () => {
    let { author, slug } = useParams();
    const [data, setData] = useState({});
    const { state: { user } } = useContext(UserContext);

    useEffect(() => {
        submissionService.getOne(slug, author)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [slug, author])

    let isAuthor = undefined;

    if(user) isAuthor = author === user.username;

    if (Object.keys(data).length === 0) return (<div>Loading...</div>);

    return (
        <section className="details-container">
            <div className="image-container">
                <img src={data.imageUrl} alt="fanart" />
            </div>
            <div className="submission-details-container">
                <div className="submission-info">
                    <div className="submission-info-left">
                        <div className="submission-avatar">
                            <img src={data?.author?.avatarUrl} alt="avatar" />
                        </div>
                        <div className="submission-info-left-container">
                            <div className="submission-info-title">
                                <h2>{data.title}</h2>
                            </div>
                            <div className="submission-info-username">
                                <span>by </span>
                                <Link to={`/${data.author?.username}`}>{data.author?.username}</Link>
                                {isAuthor
                                    ? <AuthorControls id={data._id}/>
                                    : user ?<FollowButton author={data.author} /> : ''
                                }

                            </div>
                        </div>
                    </div>

                    <div className="submission-info-right">
                        <p>Published: </p>
                        <TimeAgo datetime={data.createdAt} />
                    </div>
                </div>
                <div className="submission-statistics">
                    <div className="submission-statitstics-favourites">
                        <AiOutlineStar />
                        <span>{data.favourites?.length} Favourites</span>
                    </div>
                    <div className="submission-statitstics-views">
                        <AiFillEye />
                        <span>{data.views} Views</span>
                    </div>
                </div>
                <div className="submission-tags">
                    {data.tags.map(x => <Link to={`/tags/${x}`} key={x}>{x}</Link>)}
                </div>
                <div className="submission-description">
                    <p>{data.description}</p>
                </div>
            </div>
        </section>
    )
}

export default Details
