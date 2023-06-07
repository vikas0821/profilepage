import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import MainPage from './MainPage';
import SignupPage from "./FormBox/SignupPage";
import LoginPage from "./FormBox/LoginPage";
import ProfilePage from './ProfilePage';
import NotFoundPage from './NotFoundPage';
import Protect from "./Protect";
import Home from './Home';

const RoutesPage= () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route  path="/" element={<MainPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route path="/profile" element={ <Protect Child={ProfilePage} /> }/>
        <Route path='/home' element={ <Protect Child={Home}/>  }/>
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesPage