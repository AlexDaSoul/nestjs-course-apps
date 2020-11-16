const io = require('socket.io-client');
require('dotenv').config();

const socket = io(`http://localhost:${process.env.TICKETS_PORT}`, {
    extraHeaders: {
        Autorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiZTE5OWU4LWZlMzQtNDQ1ZS04NTE4LTcxODlhZTEzOWE2ZSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNjA1NDQyOTkzLCJleHAiOjE2MDU0NDM1OTN9.lF6UAMWZOTWvtBTiije_BmwHe7cRS_3tPe37bLVNnzo5wgLZ6pxnIZfk1ScpjoEEXsG1VmWT4fLyjOSaTUyiG069eiSJ-rPCRtxJ8YSHJ_coUhpVaCf231mbccy1kCb6X0MGVoNgVmOGb7qvKSnmoRZ_AEUmVrY10u0E2GT-xFA47eHA6oOjUJ2Mr-HsKXzYOOoDFnQrisFNkBxta-CANyX08vIL-OfldiLkpfqfR-3omWYsdEtZvbj_duaoIBPKoHlrbkItGLm7w9DCyChpTdt3S6KL3uFh_hvEAGfNH0MNhLs-zWLqKBNoC7uWtWJfACxlgSiyUJ0EAfnUe-HijJj2xKbJfP_9kwg-EVUkRb3cEP-b7kHKVWIL0xOz_cceuMmyjfzY-eVJfeDvHU6G3HWs7DzDP1a5X_nK7LJvNrfNYiIPXIk-G5q0g1lwUZyuf7KzzU4CBthTO_U8YR5TFKbjIORfaVwvVe3F9LYnc4Zl7ywQVEXTI3P0g_JBN4je',
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
