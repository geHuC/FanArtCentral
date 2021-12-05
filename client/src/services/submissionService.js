import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3030/api/v1/submissions`,
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

const getOne = (slug, author) => {
    return api.get(`/${author}/art/${slug}`);
}
const getAll = (type) => {
    return api.get(`/?sortBy=${type}`);
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
const getFeed = (sort) =>{
    return api.get(`/feed?sort=${sort}`);
}

const submissionService = {
    setUp,
    clearToken,
    create,
    getOne,
    getAll,
    getRandom,
    favourite,
    unfavourite,
    deleteOne,
    getFeed
}
export default submissionService