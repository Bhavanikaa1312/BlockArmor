import React from 'react';
// import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import LifeInArmy from './components/LifeInArmy';
import InputForm from './components/InputForm';
import About from './components/About';


function App() {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/lifeinarmy" element={<LifeInArmy />} />
                <Route path="/input" element={<InputForm />} />
                <Route path="/about" element={<About />} /> 
            </Routes>
        </Router>
    );
}

export default App;
