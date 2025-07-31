import { useChannelContext } from "../ChannelContext";

export const useActiveChannel = () => {
    const { setActiveChannel, setActiveRole, setForm } = useChannelContext();

    const changeActiveChannel = (channel: any) => {
        setActiveChannel(channel);
        setActiveRole(null);
        setForm(channel);
    };

    return { changeActiveChannel };
};
