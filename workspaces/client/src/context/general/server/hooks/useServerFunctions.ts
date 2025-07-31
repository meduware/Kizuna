import { changeServer, reloadServerList } from "@/lib/utils";
import { ChangeServerProps, ReloadServerListProps } from "../type";

export const useServerFunctions = () => {
    const handleReloadServerList = async ({
        setServerList,
        setCurrentServer,
        setCurrentChannel,
        setServerLoading,
    }: ReloadServerListProps) => {
        await reloadServerList(setServerList, setCurrentServer, setCurrentChannel);
        setServerLoading(false);
    };

    const handleChangeServer = async ({
        server,
        currentServer,
        setServerLoading,
        setCurrentServer,
        setCurrentChannel,
        setServerList,
    }: ChangeServerProps) => {
        await changeServer(
            server,
            setServerLoading,
            currentServer,
            setCurrentServer,
            setCurrentChannel,
            setServerList,
        );
    };

    return {
        reloadServerList: handleReloadServerList,
        changeServer: handleChangeServer,
    };
};
