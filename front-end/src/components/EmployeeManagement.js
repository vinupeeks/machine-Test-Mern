import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from '../contexts/authContext';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [viewData, setViewData] = useState(false);
    const [vData, setVData] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // const { user } = useContext(AuthContext);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:1001/test/employees', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setEmployees(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingEmployeeId) {
            await axios.put(`http://localhost:1001/test/employee/${editingEmployeeId}`, { name, email, phone }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } else {
            await axios.post('http://localhost:1001/test/employee', { name, email, phone }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        }
        setName('');
        setEmail('');
        setPhone('');
        setEditingEmployeeId(null);
        fetchEmployees();
    };

    const handleEdit = (employee) => {
        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setEditingEmployeeId(employee._id);
    };

    const handleDelete = async (employee, e) => {
        e.preventDefault();
        console.log(employee._id);
        try {
            await axios.delete(`http://localhost:1001/test/employee/${employee._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchEmployees();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);
    const handleView = (employee, e) => {
        setVData(employee);
    }
    const handleClose = () => {
        setVData('');
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h1>Your Employees</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <h4>Enter Details</h4>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <button type="submit">{editingEmployeeId ? 'Update Employee' : 'Add Employee'}</button>
            </form>
            <ul style={{ listStyle: 'none' }}>
                {filteredEmployees.map((employee) => (
                    <div key={employee._id}>
                        <li>{employee.name} - {employee.email} - {employee.phone}</li>
                        <button onClick={() => handleEdit(employee)}>Edit</button>
                        <button onClick={(e) => handleDelete(employee, e)}>Delete</button>
                        <button onClick={(e) => handleView(employee, e)}>View</button>
                    </div>
                ))}
            </ul>
            {vData && (
                <div>
                    <h2>EMPLOYEE Details</h2>
                    <span>Name:{vData.name} </span>
                    <span>Email:{vData.email} </span>
                    <span>Ph-Num:{vData.phone} </span>
                    <button onClick={handleClose}> CLOSE </button>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;
