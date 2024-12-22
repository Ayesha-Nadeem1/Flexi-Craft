import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io('http://localhost:5000'); // Adjust to your server URL
    }
    return socket;
};
