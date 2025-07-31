import { localServer, Server } from "@/lib/types";

export type ServerContextType = {
    currentServer: Server | null;
    serverList: Server[];
    setCurrentServer: React.Dispatch<React.SetStateAction<Server | null>>;
    setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
    changeServer: (props: ChangeServerProps) => Promise<void>;
    serverLoading: boolean;
};

export type ReloadServerListProps = {
    setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
    setCurrentServer: React.Dispatch<React.SetStateAction<Server | null>>;
    setCurrentChannel: React.Dispatch<any>;
    setServerLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChangeServerProps = {
    server: localServer;
    currentServer: Server | null;
    setServerLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentServer: React.Dispatch<React.SetStateAction<Server | null>>;
    setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
    setCurrentChannel: React.Dispatch<any>;
};
