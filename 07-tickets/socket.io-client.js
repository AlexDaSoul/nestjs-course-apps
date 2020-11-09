const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connect');

    socket.emit('manager', { id: '1830e766-c5b5-4f19-aea9-99630a57ece9' });
});

socket.on('tickets', (data) => {
    console.log('tickets', data);
});

socket.on('manager', (data) => {
    console.log('manager', data);
});

socket.on('disconnect', () => {
    console.log('disconnect');
});
