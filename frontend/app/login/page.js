'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/login', formData);
            console.log(res.data);
            alert('Login successful!');
            // You can save the token in local storage or state management solution
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            console.error(err.response.data);
            alert('Error during login, please check your credentials and try again.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
