import { createContext, useContext, useEffect, useReducer } from 'react';
import submissionService from '../services/submissionService.js';


const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            submissionService.setUp(action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            submissionService.clearToken();
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case "STORAGE-LOAD":
            submissionService.setUp(action.payload.token)
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
                token: action.payload.token
            };
        default:
            return state;
    };
};


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        if (user) {
            dispatch({
                type: 'STORAGE-LOAD',
                payload: {
                    isAuthenticated: true,
                    user: JSON.parse(user),
                    token
                }
            })
        }
    }, []);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const userState = useContext(UserContext)
    return userState
};
