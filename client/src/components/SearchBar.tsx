import React, { ChangeEvent, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchI } from '../react-app-env';
import search from '../redux/actions/search';

function SearchBar() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch<DispatchI>();

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(await search(event.target.value.trim()));
  }

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

export default memo(SearchBar);