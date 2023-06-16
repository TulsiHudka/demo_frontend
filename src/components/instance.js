import React, { useState, useEffect } from 'react';
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
    return (
        <div>
            <h1>Web Socket API Example</h1>
            <button onClick={handleButtonClick}>Send API Request</button>
            <p> Response: {response}</p>
        </div>
    );
};

export default SocketConnection;