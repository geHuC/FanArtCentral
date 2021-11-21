import './App.css'
import Navbar from './components/navbar/Navbar.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './containers/register/Register.js';
import Login from './containers/login/Login.js';
import Home from './containers/home/Home.js';
import Create from './containers/create/Create.js';
import UserContext from './context/UserContext.js';
import { useEffect, useReducer } from 'react';

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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "STORAGE-LOAD":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        token: action.payload.token
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    if (user){
      dispatch({
        type: 'STORAGE-LOAD',
        payload: {
          isAuthenticated: true,
          user: JSON.parse(user),
          token
        }
      })
    } 
  },[])
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
