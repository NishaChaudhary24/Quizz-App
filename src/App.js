import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Quizz from './Quizz';

const App = () => {
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/quizz" element={<Quizz nav={handleLogout} />} />
            </Routes>
        </Router>
    );
};

export default App;
