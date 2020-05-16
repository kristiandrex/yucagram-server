import React, { ChangeEvent, useContext } from 'react';
import { setResultsType, setSearchingType, Chat } from '../react-app-env';
import axios from 'axios';
import { TokenContext } from './App';

interface Props {
  setResults: setResultsType;
  setSearching: setSearchingType;
  chats: Chat[];
}

export default function Search({ setSearching, setResults, chats }: Props) {
  const { token } = useContext(TokenContext);

  const handleChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value.trim();

    if (value.length === 0) {
      setSearching(false);
      setResults({ chats: [], users: [] });
      return;
    }

    const chatsIncluded: Chat[] = chats.filter(chat => chat.user.username.includes(value));
    const usernames: string[] = chatsIncluded.map(chat => chat.user.username);

    try {
      const response = await axios.post('/search', { value, usernames }, { headers: { authorization: token } });
      setResults({ chats: chatsIncluded, users: response.data });
      setSearching(true);
    }

    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-2 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        onChange={handleChangeSearch}
      />
    </div>
  );
}
