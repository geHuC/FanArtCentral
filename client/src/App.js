import './App.css'
import Navbar from './components/navbar/Navbar.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './containers/register/Register.js';
import Login from './containers/login/Login.js';
import Home from './containers/home/Home.js';
import Create from './containers/create/Create.js';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
