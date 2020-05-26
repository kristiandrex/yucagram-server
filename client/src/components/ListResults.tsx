import React, { memo } from 'react';
import { ResultsType } from '../react-app-env';
import ListUsers from './ListUsers';
import ListChats from './ListChats';

interface Props {
  results: ResultsType;
}

function ListResults({ results }: Props) {
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

export default memo(ListResults);