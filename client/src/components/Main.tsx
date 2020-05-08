import React, { useContext, ChangeEvent, useState, createContext, SetStateAction, Dispatch } from 'react';
import ProfileCard from './ProfileCard';
import { UserContext } from './App';
import axios from 'axios';
import ListChats from './ListChats';
import ListUsers from './ListUsers';
import CurrentChat from './CurrentChat';

interface ChatCTX {
  setCurrentChat: Dispatch<SetStateAction<User | null>>;
}

export const ChatContext = createContext<ChatCTX>({
  setCurrentChat: () => { },
});

export default function Main() {
  const userContext = useContext(UserContext);
  const user: User = userContext.user as User;

  const [chats, setChats] = useState<Chat[]>(user.chats ? user.chats : []);
  const [users, setUsers] = useState<User[]>([]);
  const [currentChat, setCurrentChat] = useState<User | null>(null);

  const handleChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value.trim();

    if (value.length === 0) {
      setUsers([]);
      setChats(user.chats);

      return;
    }

    const chats: Chat[] = user.chats.filter(chat => chat.user.username.includes(value));
    const usernames: string[] = chats.map(chat => chat.user.username);

    try {
      const response = await axios.post('/search', { value, usernames });
      setUsers(response.data);
      setChats(chats);
    }

    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row no-gutters h-100">
      <div className="col-3 bg-white border-right">
        <div className="bg-primary text-white">
          <ProfileCard
            alt='Tu foto'
            avatar={user.avatar}
            username={user.username}
          />
        </div>
        <div className="p-2 border-bottom">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            onChange={handleChangeSearch}
          />
        </div>
        <ChatContext.Provider value={{ setCurrentChat }}>
          <ListChats usersCount={users.length} chats={chats} />
          <ListUsers users={users} />
        </ChatContext.Provider>
      </div>
      <CurrentChat user={currentChat} chats={chats} />
    </div>
  );
}