import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const Users = () => {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getusers');
            console.log(response);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const createUser = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/createusers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            if (response.ok) {
                setName('');
                setEmail('');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            console.log(id);
            const response = await fetch(`http://localhost:8000/api/users/${id}`, { method: 'DELETE' });
            console.log(response);
            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    console.log(users);
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Create User</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={createUser}>Create</button>
        </div>
    );
};

export default Users;
