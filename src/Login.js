import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleClick = () => {
        if (username === "" || password === "") {
            alert("Please fill both the details.");
        } else {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Successfully logged in');
            navigate('/quizz'); // Navigate to the Quizz page
        }
    };

    return (
        <div className='cont'>
            <div>
                <label class='labelLogin'>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    class='inputLogin'
                />
                <label class='labelLogin'>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    class='inputLogin'
                />
                <br />
                <button onClick={handleClick}>Login</button>
                <br />
                <button onClick={() => alert("Please log in first.")}>Quizz</button>
            </div>
        </div>
    );
};

export default Login;
