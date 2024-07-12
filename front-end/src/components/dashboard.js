import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';
import EmployeeManagement from './EmployeeManagement';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1001/test/dashboard', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Dashboard Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Logout</button>
            {data && (
                <div>
                    <h2>Welcome, {data.name}</h2>
                    <p>Your email: {data.email}</p>
                    <EmployeeManagement />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
