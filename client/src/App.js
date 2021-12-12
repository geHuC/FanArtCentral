import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext.js';
import Navbar from './components/navbar/Navbar.js';
import Register from './containers/register/Register.js';
import Login from './containers/login/Login.js';
import Home from './containers/home/Home.js';
import Submit from './containers/submit/Submit.js';
import Details from './containers/details/Details.js';
import Footer from './components/footer/Footer.js';
import About from './containers/about/About.js';
import Contact from './containers/contact/Contact.js';
import Feed from './containers/feed/Feed.js';
import TagsContainer from './containers/tagsContainer/TagsContainer.js';
import Search from './containers/search/Search.js';
import Profile from './containers/profile/Profile.js';
import ScrollToTop from './components/scrollToTop/ScrollToTop.js';
import UserSubmissions from './containers/userSubmissions/UserSubmissions.js';
import UserFavourites from './containers/userFavourites/userFavourites.js';
import Settings from './containers/settings/Settings.js';
import RequireGuest from './components/routeGuards/RequireGuest.js';
import RequireAuth from './components/routeGuards/RequireAuth.js';
import NotFound from './containers/notFound/NotFound.js';

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<RequireGuest />} >
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>

              <Route element={<RequireAuth />} >
                <Route path="/submit" element={<Submit />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              <Route path="/tags/:tag" element={<TagsContainer />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/:username/submissions" element={<UserSubmissions />} />
              <Route path="/:username/favourites" element={<UserFavourites />} />
              <Route path="/:author/art/:slug" element={<Details />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
