"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Server } from "@/lib/types";
import { useServerFunctions } from "./hooks/useServerFunctions";
import { useGlobalContext } from "@/context/GlobalContext";
import { ChangeServerProps } from "./type";

type ServerContextType = {
    currentServer: Server | null;
    serverList: Server[];
    setCurrentServer: React.Dispatch<React.SetStateAction<Server | null>>;
    setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
    changeServer: (props: ChangeServerProps) => Promise<void>;
    serverLoading: boolean;
};

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { setCurrentChannel } = useGlobalContext();
    const [currentServer, setCurrentServer] = useState<Server | null>(null);
    const [serverList, setServerList] = useState<Server[]>([]);
    const [serverLoading, setServerLoading] = useState<boolean>(true);
    const { reloadServerList, changeServer } = useServerFunctions();

    useEffect(() => {
        reloadServerList({
            setServerList,
            setCurrentServer,
            setCurrentChannel,
            setServerLoading,
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ServerContext.Provider
            value={{
                currentServer,
                serverList,
                setCurrentServer,
                setServerList,
                changeServer,
                serverLoading,
            }}
        >
            {children}
        </ServerContext.Provider>
    );
};

export const useServerContext = () => {
    const context = useContext(ServerContext);
    if (!context)
        throw new Error(
            "useServerContext must be used within ServerContextProvider",
        );
    return context;
};
