import { createContext } from "react";
import { UserCTX, TokenCTX, CurrentUserCTX, CurrentChatCTX } from "../react-app-env";

const UserContext = createContext<UserCTX>({
  user: null,
  setUser: () => { }
});

const TokenContext = createContext<TokenCTX>({
  token: null,
  removeToken: () => { },
  setToken: () => { }
});

const CurrentUserContext = createContext<CurrentUserCTX>(() => {});

const CurrentChatContext = createContext<CurrentChatCTX>(() => { });

const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export {
  UserContext,
  TokenContext,
  CurrentUserContext,
  SocketContext,
  CurrentChatContext
}