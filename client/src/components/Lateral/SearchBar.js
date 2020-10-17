import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import types from 'types';
import search from 'actions/search';

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;

  i {
    cursor: pointer;
  }
`;

export default function SearchBar() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const searching = useSelector(state => state.results.searching);

  const handleSearch = async (event) => {
    setValue(event.target.value);
    dispatch(search(event.target.value.trim()));
  };

  const handleClear = () => dispatch({ type: types.CLEAR_SEARCH });

  useEffect(() => {
    if (!searching) {
      setValue('');
    }
  }, [searching]);

  return (
    <StyledSearchBar className='p-2 border-bottom'>
      <input
        type='text'
        className='form-control'
        placeholder='Buscar...'
        onChange={handleSearch}
        value={value}
      />
      {searching && <i className='text-primary ml-2 material-icons' onClick={handleClear}>clear</i>}
    </StyledSearchBar>
  );
}