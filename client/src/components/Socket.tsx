import React, { useEffect } from 'react';
import App from './App';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { Message, DispatchI } from '../react-app-env';
import newMessage from '../redux/actions/newMessage';

export const socket = io('/');

export default function Socket() {
    const dispatch = useDispatch<DispatchI>();

    useEffect(() => {
        socket.on('NEW_MESSAGE', async (message: Message) => {
            dispatch(await newMessage(message));
        });
    }, [dispatch]);

    return (
        <App />
    );
}
