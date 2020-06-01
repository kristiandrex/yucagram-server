import React from 'react';
import Container from './Container';
import io from 'socket.io-client';

export const socket = io('/');

export default function Root() {
  return (
    <Container />
  );
}