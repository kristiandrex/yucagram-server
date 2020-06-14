import React from 'react';
import ItemListChats from './ItemListChats';
import { Chat } from '../react-app-env';

interface Props {
  chats: Chat[];
}

export default function ListChats({ chats }: Props) {
  return (
    <div>
      {chats.map((chat, index) => <ItemListChats key={chat._id} chat={chat} index={index} />)}
    </div>
  );
}