'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const { fullname, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/register', formData);
            console.log(res.data);
            alert('Registration successful!');
        } catch (err) {
            console.error(err.response.data);
            alert('Error during registration, please try again.');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Full Name:</label>
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={onChange}
                    required
                />
            </div>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
