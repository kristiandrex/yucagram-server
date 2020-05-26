import React, { ChangeEvent, useContext, Dispatch, SetStateAction, useCallback } from 'react';
import { TokenContext, UserContext } from '../context';
import { Chat, ResultsType } from '../react-app-env';
import axios from 'axios';

interface Props {
  setResults: Dispatch<SetStateAction<ResultsType>>;
  setSearching: Dispatch<SetStateAction<boolean>>;
}

export default function SearchBar({ setResults, setSearching }: Props) {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);

  const handleSearch = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value.trim();

    if (value.length === 0) {
      return setSearching(false);
    }

    const chats: Chat[] = user?.chats.filter(chat => chat.user.username.includes(value)) as Chat[];
    const notInclude: string[] = chats.map(chat => chat.user.username);

    try {
      setSearching(true);
      const response = await axios.post('/search', { value, notInclude }, { headers: { authorization: token } })
      setResults({ chats, users: response.data });
    }

    catch (error) {
      console.log(error);
    }

  }, [setResults, token, setSearching, user]);

  return (
    <div className="p-2 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        onChange={handleSearch}
      />
    </div>
  );
};