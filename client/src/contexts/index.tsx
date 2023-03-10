import { UserContextProvider } from "./UserContext";

interface GlobalContextProps {
  children: JSX.Element;
}

const GlobalContext = ({ children }: GlobalContextProps) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default GlobalContext;
