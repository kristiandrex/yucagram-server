import React, { ChangeEvent, useState, memo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchI, State } from '../react-app-env';
import search from '../redux/actions/search';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;

  i {
    cursor: pointer;
  }
`;

function SearchBar() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch<DispatchI>();

  const searching: boolean = useSelector<State>(state => state.searching) as boolean;

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(await search(event.target.value.trim()));
  }

  const handleClear = useCallback(() => {
    dispatch({
      type: 'CLEAR_RESULTS'
    });
  }, [dispatch]);

  useEffect(() => {
    if (!searching) {
      setValue('');
    }
  }, [searching])

  return (
    <StyledSearchBar className="p-2 border-bottom">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        onChange={handleSearch}
        value={value}
      />
      {searching && <i className="text-primary ml-2 material-icons" onClick={handleClear}>clear</i>}
    </StyledSearchBar>
  );
};

export default memo(SearchBar);