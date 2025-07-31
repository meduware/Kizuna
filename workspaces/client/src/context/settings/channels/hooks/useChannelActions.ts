import { useChannelContext } from "../ChannelContext";
import { useGlobalContext } from "@/context/GlobalContext";
import { apiHandler } from "@/lib/handlers/api";

export const useChannelActions = () => {
    const { form, setForm } = useChannelContext();
    const { currentServer, setCurrentServer } = useGlobalContext();

    async function updateChannel() {
        console.log("Update channel");
        const response = await apiHandler(
            "/api/channel-management/update-channels",
            form,
            "PUT",
        );

        console.log(currentServer);
        const updatedChannels = currentServer?.channels.map((channel) =>
            channel.id === response.channel.id
                ? { ...channel, ...response.channel }
                : channel,
        );

        setCurrentServer({ ...currentServer, channels: updatedChannels });

        setForm(response.channel);
    }

    async function deleteChannel(channel_id: number) {
        const response = await apiHandler(
            "/api/channel-management/delete-channel/",
            { channel_id },
            "DELETE",
        );
        if (response.error) return;

        setCurrentServer({
            ...currentServer,
            channels: currentServer?.channels.filter(
                (channel) => channel.id !== channel_id,
            ),
        });

        console.log({
            ...currentServer,
            channels: currentServer?.channels.filter(
                (channel) => channel.id !== channel_id,
            ),
        });
        console.log(response);
    }

    async function createChannel(channel: {
        channel_name: string;
        channel_description: string;
        channel_type: string;
    }) {
        console.log("create channel");
        const response = await apiHandler(
            "/api/channel-management/create-channel",
            channel,
            "POST",
        );

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (currentServer === null) {
            console.log("currentServer is null");
        } else {
            setCurrentServer({
                ...currentServer,
                channels: [...currentServer.channels, response.channel],
            });

            console.log({
                ...currentServer,
                channels: [...currentServer.channels, response.channel],
            });
        }
    }

    return { updateChannel, deleteChannel, createChannel };
};
