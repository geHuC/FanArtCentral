import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3030/auth`,
})

const register = (data) => {
    return api.post('/register', data);
}

const Auth = {register}
export default Auth