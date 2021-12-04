import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../formInput/FormInput.js'
import './registerForm.css'
import authService from '../../services/authService.js'
import UserContext from '../../context/UserContext.js'

const RegisterForm = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(UserContext);
    const [serverError, setServerError] = useState({});
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        fullname: ""
    });

    const inputs = [
        {
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username:',
            errorMessage: serverError.username ? serverError.username : 'Username must be at least 5 characters and contain only alphanumeric characters and underscore "_"',
            pattern: "^[a-zA-Z0-9_]+$",
            minLength: 5,
            required: true,
            classes: serverError.username ? 'form-input-invalid' : ''
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email:',
            errorMessage: serverError.email ? serverError.email : 'Please enter a valid email address',
            pattern: "^[A-Za-z0-9_\.]+@+[A-Za-z]+\.+[A-Za-z]+$",
            required: true,
            classes: serverError.email ? 'form-input-invalid' : ''
        },
        {
            name: 'fullname',
            type: 'text',
            placeholder: 'Full name',
            label: 'Full name:',
            errorMessage: 'Full name must be at least 5 characters and contain only letters',
            minLength: 5,
            pattern: "^[a-zA-Z ]+$",
            required: true,
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Passowrd',
            label: 'Password:',
            errorMessage: 'Password must be at least 8 characters long',
            pattern: ".{8,}",
            required: true,
        },
        {
            name: 'repeatPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            label: 'Confirm Password:',
            errorMessage: 'Passwords do not match',
            pattern: values.password,
            required: true,
            lastField: true,
        }
    ];

    const submitHandler = (e) => {
        e.preventDefault();
        authService.register(values)
            .then(data => {
                dispatch({ type: 'LOGIN', payload: data.data });
                navigate('/');
            })
            .catch(err => {
                setServerError(err.response.data);
                console.log(err.response);
            });
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <form className="register-form" onSubmit={submitHandler}>
            {inputs.map(input => <FormInput key={input.name} {...input} value={values[input.name]} onChange={onChange}
                invalid={serverError} />)}
            <button type="submit">Submit</button>
        </form>
    )
}

export default RegisterForm
