import './App.css'
import Navbar from './components/navbar/Navbar.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './containers/register/Register.js';
import Login from './containers/login/Login.js';
import Home from './containers/home/Home.js';
import UserContext from './context/UserContext.js';
import { useEffect, useReducer } from 'react';
import Submit from './containers/submit/Submit.js';
import Details from './containers/details/Details.js';
import submissionService from './services/submissionService.js';
import Footer from './components/footer/Footer.js';
import About from './containers/about/About.js';
import Contact from './containers/contact/Contact.js';
import Feed from './containers/feed/Feed.js';
import TagsContainer from './containers/tagsContainer/TagsContainer.js';
import Search from './containers/search/Search.js';

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
  }
};

function App() {
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
  }, [])
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
              <Route path="/submit" element={<Submit />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/tags/:tag" element={<TagsContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/:author/art/:slug" element={<Details />} />
            </Routes>
          </div>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
