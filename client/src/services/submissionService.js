import axios from 'axios';

const api = axios.create({
    baseURL: `https://fanartcentral.herokuapp.com/api/v1/submissions`,
});

const setUp = (token) => {
    api.defaults.headers.common['X-Authorization'] = token;
}
const clearToken = () => {
    delete api.defaults.headers.common['X-Authorization'];
}

const create = (formData) => {
    return api.post('/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

const update = (id, formData) => {
    return api.patch(`/${id}`, formData);
}

const getOne = (slug, author) => {
    return api.get(`/${author}/art/${slug}`);
}
const getAll = (type, page) => {
    return api.get(`/?sortBy=${type}&page=${page}`);
}
const getByTag = (sortType, tag) => {
    return api.get(`/tags/${tag}?sortBy=${sortType}`);
}
const getRandom = () => {
    return api.get('/random');
}
const favourite = (id) => {
    return api.get(`/favourite/${id}`);
}
const unfavourite = (id) => {
    return api.get(`/unfavourite/${id}`);
}
const deleteOne = (id) => {
    return api.delete(`/${id}`);
}
const getFeed = (sort) => {
    return api.get(`/feed?sort=${sort}`);
}

const getBySearch = (search, sort) => {
    return api.get(`/search${search}&sort=${sort}`)
}

const submissionService = {
    setUp,
    clearToken,
    create,
    update,
    getOne,
    getAll,
    getRandom,
    favourite,
    unfavourite,
    deleteOne,
    getFeed,
    getByTag,
    getBySearch
}
export default submissionService