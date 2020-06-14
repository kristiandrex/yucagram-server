import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import ListChats from './ListChats';
import ListResults from './ListResults';
import { Chat, State } from '../react-app-env';
import { useSelector } from 'react-redux';

export default function ChatsContainer() {
  const chats: Chat[] = useSelector((state: State) => state.chats);
  const searching: boolean = useSelector((state: State) => state.searching);

  return (
    <Fragment>
      <SearchBar />
      {searching ? <ListResults /> : <ListChats chats={chats} />}
    </Fragment>
  );
}