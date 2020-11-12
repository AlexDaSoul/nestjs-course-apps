const io = require('socket.io-client');
const socket = io('http://localhost:3000', {
    extraHeaders: {
        Autorization: '',
    }
});

socket.on('connect', () => {
    console.log('connect');

    socket.emit('tickets');
    socket.emit('client');
    socket.emit('manager');
});

socket.on('tickets', (data) => {
    console.log('tickets', data);
});

socket.on('client', (data) => {
    console.log('client', data);
});

socket.on('manager', (data) => {
    console.log('manager', data);
});

socket.on('disconnect', () => {
    console.log('disconnect');
});

socket.on('error', (error) => {
    console.log('error', error);
});
