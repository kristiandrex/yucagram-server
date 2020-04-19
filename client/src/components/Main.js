import React, { createRef, useContext, useState } from 'react';
import ProfileCard from './ProfileCard';
import CurrenChat from './CurrenChat';
import { UserContext } from './App';
import axios from 'axios';

export default function Main() {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  const searchBarRef = createRef();
  const inputSearchRef = createRef();

  const handleSearch = (event) => {
    event.preventDefault();

    if (event.target.value.trim() !== '') {
      searchBarRef.current.classList.add('active');
    } else {
      searchBarRef.current.classList.remove('active');
    }
  };

  const handleClearSearch = () => {
    searchBarRef.current.classList.remove('active');
    inputSearchRef.current.value = '';
  };

  return (
    <div className='row no-gutters h-100'>
      <div className='col-4 h-100 bg-white border-right'>
        <div className='bg-primary text-white'>
          <ProfileCard avatar={user.avatar} alt='Tu foto' />
        </div>
        <div className='p-2 border-bottom search-bar' ref={searchBarRef}>
          <input
            type='text'
            className='form-control'
            placeholder='Buscar...'
            onChange={handleSearch}
            ref={inputSearchRef}
          />
          <button className='btn btn-link' onClick={handleClearSearch}>
            <i className='material-icons'>clear</i>
          </button>
        </div>
        <div>
          {chats.map((chat) => (
            <div style={{ cursor: 'pointer' }}>
              <ProfileCard avatar={user.avatar} alt={'Foto de ' + user.username} />
            </div>
          ))}
        </div>
      </div>
      <CurrenChat />
    </div>
  );
}
