import './favouriteButton.css'
import { useContext, useEffect, useState } from 'react';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import UserContext from '../../context/UserContext.js';
import prettyNumbers from '../../utils/prettyNumbers.js';
import { useNavigate } from 'react-router-dom';
import submissionService from '../../services/submissionService.js';

const FavouriteButton = ({ favourites, postId, author }) => {
    const [hasFavourited, setHasFavourited] = useState(false);
    const [favouritesCount, setFavouritesCount] = useState(favourites.length)
    const { state: { user } } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (favourites.some(x => x === user._id)) {
                setHasFavourited(true);
            }
        }
    }, [user, favourites])
    const addToFavourites = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login')
        }
        if (user.username === author.username) {
            return;
        }
        submissionService.favourite(postId)
            .then(res => {
                setHasFavourited(true);
                setFavouritesCount(favouritesCount + 1);
            })
            .catch(err => console.log(err.response))
    }

    const removeFromFavourites = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login')
        }
        if (user.username === author.username) {
            return;
        }
        submissionService.unfavourite(postId)
            .then(res => {
                setHasFavourited(false);
                setFavouritesCount(favouritesCount - 1);
            })
            .catch(err => console.log(err.response))
    }
    return (
        <>
            {hasFavourited
                ? (<div className="favourites-button-container favourites-button-container-followed" onClick={removeFromFavourites}>
                    < AiFillStar />{prettyNumbers(favouritesCount)}
                </div>)
                : (<div className="favourites-button-container favourites-button-container-not-followed" onClick={addToFavourites}>
                    < AiOutlineStar />{prettyNumbers(favouritesCount)}
                </div>)
            }
        </>
    )
}

export default FavouriteButton
