import axios from 'axios';

const api = axios.create({
    baseURL: `https://fanartcentral.herokuapp.com/api/v1/users`,
});

const setUp = (token) => {
    api.defaults.headers.common['X-Authorization'] = token;
}
const clearToken = () => {
    delete api.defaults.headers.common['X-Authorization'];
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
const updateSettings = (formData) => {
    return api.patch('/profile/settings', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

const userService = {
    setUp,
    clearToken,
    getByUsername,
    getOneById,
    getSmall,
    follow,
    unfollow,
    updateSettings,
}
export default userService