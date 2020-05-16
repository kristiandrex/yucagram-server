import React, { useContext, useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { UserContext, TokenContext } from './App';
import CurrentChat from './CurrentChat';
import { User, Chat, CurrentChatType, ResultsType } from '../react-app-env';
import NoCurrentChat from './NoCurrentChat';
import Search from './Search';
import ListChats from './ListChats';
import ListResults from './ListResults';
import axios from 'axios';

export default function Main() {
  const userContext = useContext(UserContext);
  const user: User = userContext.user as User;
  const { token } = useContext(TokenContext);

  const [chats, setChats] = useState<Chat[]> ([]);
  const [currentChat, setCurrentChat] = useState<CurrentChatType>({ chat: null, user: null });
  const [searching, setSearching] = useState<boolean>(false);
  const [results, setResults] = useState<ResultsType>({ chats: [], users: [] });

  const reloadChats = async () => {
    try {
      const response = await axios.get('/chats', { headers: { authorization: token } });

      const chats: Chat[] = response.data;
      chats.sort((a, b) => Date.parse(b.room.lastModified) - Date.parse(a.room.lastModified));

      setChats(chats);
      setSearching(false);
    }

    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const chats = user.chats

    chats.sort((a, b) => Date.parse(b.room.lastModified) - Date.parse(a.room.lastModified));

    setChats(chats);
  }, [user.chats]);

  return (
    <div className="row no-gutters h-100">
      <div className="col-3 bg-white border-right">
        <div className="bg-primary text-white">
          <ProfileCard user={user} />
        </div>
        <Search
          setResults={setResults}
          setSearching={setSearching}
          chats={chats}
        />
        {
          searching ? (
            <ListResults
              results={results}
              setCurrentChat={setCurrentChat}
            />
          ) : (
            <ListChats
              chats={chats}
              setCurrentChat={setCurrentChat}
            />
          )
        }
      </div>
      {
        currentChat.chat ? (
          <CurrentChat 
            chat={currentChat.chat}
            reloadChats={reloadChats}
          />
        ) : (
          <NoCurrentChat
            user={currentChat.user}
            setCurrentChat={setCurrentChat}
            reloadChats={reloadChats}
          />
        )
      }
    </div>
  );
}