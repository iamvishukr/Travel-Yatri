import React, { createContext, useContext, useEffect, useState } from "react";
import userApi, { useGetMeQuery } from "../../redux/services/user";
import { IUser } from "../../contracts/IUser";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/auth";

export interface IUserContext {
  isLoading: boolean;
  user: IUser | null | undefined;
  setUser: (args: IUser | null) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, error } = useGetMeQuery(); // Include error handling in the query
  const [user, setUser] = useState<IUser | null>();
  const appDispatcher = useAppDispatch();

  const handleLogout = () => {
    appDispatcher(logout());
    appDispatcher(userApi.util.resetApiState());
    setUser(null);
  };

  useEffect(() => {
    if (data?.data) {
      setUser(data?.data);
    }

    // Check for 401 error and trigger logout
    if (error && "status" in error && error.status === 401) {
      console.log("loggin out");
      handleLogout();
    }
  }, []); // data, error

  return (
    <UserContext.Provider
      value={{ user: data?.data ?? user, setUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
