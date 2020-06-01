import React, { useState, Fragment, memo, useEffect } from 'react';
import SearchBar from './SearchBar';
import ListChats from './ListChats';
import ListResults from './ListResults';
import { ResultsType, Chat, State } from '../react-app-env';
import { useSelector } from 'react-redux';

function ChatsContainer() {
  const chatsFromContext = useSelector((state: State) => state.user?.chats) as Chat[];

  const [results, setResults] = useState<ResultsType>({ chats: [], users: [] });
  const [searching, setSearching] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>(chatsFromContext || []);

  useEffect(() => {
    setChats(chatsFromContext);
    setSearching(false);
    setResults({ chats: [], users: [] });
  }, [chatsFromContext]);

  return (
    <Fragment>
      <SearchBar
        setResults={setResults}
        setSearching={setSearching}
        searching={searching}
      />
      {searching ? <ListResults results={results} /> : <ListChats chats={chats} />}
    </Fragment>
  );
}

export default memo(ChatsContainer);