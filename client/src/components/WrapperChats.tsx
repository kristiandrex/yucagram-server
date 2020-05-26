import React, { useState, Fragment, useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import ListChats from './ListChats';
import ListResults from './ListResults';
import { ResultsType, Chat } from '../react-app-env';
import { UserContext, SocketContext } from '../context';

export default function WrapperChats() {
  const [results, setResults] = useState<ResultsType>({ chats: [], users: [] });
  const [searching, setSearching] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);

  if (searching) {
    return (
      <Fragment>
        <SearchBar
          setResults={setResults}
          setSearching={setSearching}
        />
        <ListResults results={results} />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <SearchBar
        setResults={setResults}
        setSearching={setSearching}
      />
      <ListChats chats={user?.chats as Chat[]} />
    </Fragment>
  );
}