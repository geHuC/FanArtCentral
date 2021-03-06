import './details.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { AiFillEye, AiOutlineStar } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext.js';
import AuthorControls from '../../components/authorControls/AuthorControls.js';
import FollowButton from '../../components/followButton/FollowButton.js';
import submissionService from '../../services/submissionService.js';
import LoadingDots from '../../components/loadintDots/LoadingDots.js';
import UsernameHoverCard from '../../components/usernameHoverCard/UsernameHoverCard.js';
import FavouriteButton from '../../components/favouriteButton/FavouriteButton.js';
import changeTitle from '../../utils/changeTitle.js';
import ImageDimensionsCard from '../../components/imageDimensionsCard/ImageDimensionsCard.js';

const Details = () => {
    let navigate = useNavigate()
    let { author, slug } = useParams();
    const [data, setData] = useState({});
    const { state: { user, isAuthenticated } } = useUserContext();

    useEffect(() => {
        submissionService.getOne(slug, author)
            .then(res => {
                setData(res.data);
                changeTitle(`${res.data.title} by ${res.data.author.username}`);
            })
            .catch(err => {
                navigate('/404', { replace: true });
            });
    }, [slug, author, navigate])
    let isAuthor = undefined;

    if (user) isAuthor = author === user.username;

    if (Object.keys(data).length === 0) return <LoadingDots />;

    return (
        <section className="details-container">
            <div className="image-container">
                <a href={data.imageUrl} target='_blank' rel="noreferrer" >
                    <img src={data.imageUrl} alt="fanart" />
                </a>
            </div>
            <div className="submission-details-container">
                {!isAuthor && <div className="submission-favourites">
                    <FavouriteButton
                        big={true}
                        favourites={data.favourites}
                        author={data.author}
                        postId={data._id} />
                </div>}
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
                                {/* <Link to={`/${data.author?.username}`}>{data.author?.username}</Link> */}
                                <UsernameHoverCard username={data.author.username} />
                                {isAuthor
                                    ? <AuthorControls id={data._id} data={data} setData={setData} />
                                    : isAuthenticated ? <FollowButton author={data.author} /> : ''
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
                {data.height && <div className="submission-image-details">
                    <ImageDimensionsCard width={data.width} height={data.height} size={data.fileSize}/>
                </div>}
            </div>
        </section>
    )
}

export default Details
