import React, { createContext, useState } from 'react';
import axios from '../axios.js';
// import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = async (name, email, password, navigate) => {
        try {
            console.log(name, email, password, navigate);
            const response = await axios.post('/signup', { name, email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };


    const login = async (email, password) => {
        try {
            const response = await axios.post('/login', { email, password });
            console.log(response);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.token);
        } catch (error) {
            alert("You Have not a account, Let's create It")
            // Navigate('/login');
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
