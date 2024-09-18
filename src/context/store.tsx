"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
interface GlobalContextType {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: string;
  setData: Dispatch<SetStateAction<string>>;
}

const initialGlobalContext: GlobalContextType = {
  userId: '',
  setUserId: () => {},
  data: '',
  setData: () => '',
};

export const GlobalContext = createContext(initialGlobalContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>('test');
  const [data, setData] = useState<string>('test2');

  return (
    <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);