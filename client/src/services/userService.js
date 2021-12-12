import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3030/api/v1/users`,
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
const getByUsername = (username) => {
    return api.get(`/get/${username}`)
}
const getOneById = (id) => {
    return api.get(`/getById/${id}`);
}
const getSmall = (id) => {
    return api.get(`/getSmall/${id}`);
}

const follow = (username) => {
    return api.get(`/follow/${username}`);
}
const unfollow = (username) => {
    return api.get(`/unfollow/${username}`);
}


const userService = {
    setUp,
    clearToken,
    getByUsername,
    getOneById,
    getSmall,
    follow,
    unfollow
}
export default userService