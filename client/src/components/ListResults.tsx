import React from 'react';
import { Results, State } from '../react-app-env';
import ListUsers from './ListUsers';
import ListChats from './ListChats';
import { useSelector } from 'react-redux';

export default function ListResults() {
  const results = useSelector<State, Results>((state) => state.results);

  return (
    <div>
      {
        results.chats.length > 0 && (
          <div className="p-2 border-bottom font-weight-bold text-center">Chats</div>
        )
      }
      <ListChats chats={results.chats} />
      {
        results.users.length > 0 && (
          <div className="p-2 border-bottom font-weight-bold text-center">Usuarios</div>
        )
      }
      <ListUsers users={results.users} />
    </div>
  );
}
