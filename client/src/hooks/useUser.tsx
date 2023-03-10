import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export const useUser = () => {
  return useContext(UserContext);
};
