import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL
const SocketConnectiom = () => {
    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('notification', (data) => {
            console.log('Received notification:', data);
            // Handle the received notification here
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection
        };
    }, []);

    // Rest of your component code
};

export default SocketConnectiom;