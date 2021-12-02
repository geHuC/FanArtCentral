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

const getOne = (slug) =>{
    return api.get(`/${slug}`);
}


const submissionService = { setUp, clearToken, create, getOne }
export default submissionService