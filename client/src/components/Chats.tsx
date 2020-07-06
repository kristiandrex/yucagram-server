import React, { Fragment } from 'react';
import SearchBar from './SearchBar';
import ListChats from './ListChats';
import ListResults from './ListResults';
import { Chat, State } from '../react-app-env';
import { useSelector } from 'react-redux';

export default function Chats() {
  const chats: Chat[] = useSelector<State, Chat[]>((state) => state.chats.collection);
  const searching: boolean = useSelector<State, boolean>((state) => state.results.searching);

  return (
    <Fragment>
      <SearchBar />
      {searching ? <ListResults /> : <ListChats chats={chats} />}
    </Fragment>
  );
}