import { createContext, useContext, useReducer } from 'react';
import submissionService from '../services/submissionService.js';
import userService from '../services/userService.js';

//had to take them out of userProvider useEffect as it causes errors on cold load as it tries to show the page before storing them in the context
let lsUser = localStorage.getItem('user');
let lsToken = localStorage.getItem('token');

const initialState = {
    isAuthenticated: lsUser ? true : false,
    user: lsUser ? JSON.parse(lsUser) : null,
    token: lsToken,
};
//set up the services
if (lsUser) {
    submissionService.setUp(lsToken);
    userService.setUp(lsToken);
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            submissionService.setUp(action.payload.token);
            userService.setUp(action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            submissionService.clearToken();
            userService.clearToken();
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case "STORAGE-LOAD":
            submissionService.setUp(action.payload.token);
            userService.setUp(action.payload.token);
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user,
                token: action.payload.token
            };
        case "AVATAR-CHANGE":
            let obj = {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.payload.avatar
                }
            }
            localStorage.setItem("user", JSON.stringify(obj.user));
            return obj
        default:
            return state;
    };
};


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
