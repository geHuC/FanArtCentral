import axios from 'axios';

const api = axios.create({
    baseURL: `https://fanartcentral.herokuapp.com/auth`,
})

const register = (data) => {
    return api.post('/register', data);
}

const login = (data) => {
    return api.post('/login', data);
}

const authService = {register, login}
export default authService