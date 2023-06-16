import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const SocketConnection = () => {
    const [response, setResponse] = useState('');
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });
        // return () => {
        //     socket.disconnect(); // Clean up the socket connection
        // };
    }, []);

    const handleButtonClick = () => {
        socket.emit('apiRequest', {}, (responseData) => {
            alert(responseData);
        });
        socket.on('response', (data) => {
            console.log(data);
            setResponse(data);
        });
    };

    const apiCallHandler = () => {
        axios.get('http://192.168.2.79:8999/users')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Web Socket API Example</h1>
            <button onClick={handleButtonClick}>Send API Request</button>
            <p> Response: {response}</p>
            <button onClick={apiCallHandler}>fetchUser</button>

        </div>
    );
};

export default SocketConnection;