import './favouriteButton.css'
import { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useUserContext } from '../../context/UserContext.js';
import prettyNumbers from '../../utils/prettyNumbers.js';
import { useNavigate } from 'react-router-dom';
import submissionService from '../../services/submissionService.js';

const FavouriteButton = ({ favourites, postId, author, big }) => {
    const [hasFavourited, setHasFavourited] = useState(false);
    const [favouritesCount, setFavouritesCount] = useState(favourites.length)
    const { state: { user } } = useUserContext()
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
            return navigate('/login')
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
            return navigate('/login')
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
            {!big
                ? hasFavourited
                    ? (<div className="favourites-button-container favourites-button-container-followed" onClick={removeFromFavourites}>
                        < AiFillStar />{prettyNumbers(favouritesCount)}
                    </div>)
                    : (<div className="favourites-button-container favourites-button-container-not-followed" onClick={addToFavourites}>
                        < AiOutlineStar />{prettyNumbers(favouritesCount)}
                    </div>)
                : hasFavourited
                    ? (<div className="favourites-button-container-big favourites-button-container-followed" onClick={removeFromFavourites}>
                        < AiFillStar /> In Favourites
                    </div>)
                    : (<div className="favourites-button-container-big favourites-button-container-not-followed" onClick={addToFavourites}>
                        < AiOutlineStar /> Add to favourites
                    </div>)
            }
        </>
    )
}

export default FavouriteButton
