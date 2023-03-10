import { createContext, useCallback, useContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

type User = {
  name: string;
  email: string;
  password: string;
  profile: string;
};

interface UserContextProviderProps {
  children: JSX.Element;
}

interface UserContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUser: () => void;
}

export const UserContext = createContext<UserContextData>({
  user: null,
  setUser: () => {},
  getUser: () => {},
});
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState();

  const getUser = useCallback(async () => {
    const { data } = await axios.get("http://localhost:1337/api/user", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (data.success) {
      setUser(data.user);
    } else {
      toast.error(data.message);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
