import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Chat, ResultsType, State } from '../react-app-env';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface Props {
  setResults: Dispatch<SetStateAction<ResultsType>>;
  setSearching: Dispatch<SetStateAction<boolean>>;
  searching: boolean;
}

export default function SearchBar({ setResults, setSearching, searching }: Props) {
  const { user, token } = useSelector((state: State) => ({ user: state.user, token: state.token }));

  const [value, setValue] = useState<string>('');

  const handleSearch = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

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

  useEffect(() => {
    if (!searching)
      setValue('');
  }, [searching]);

  return (
    <div className="p-2 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        onChange={handleSearch}
        value={value}
      />
    </div>
  );
};