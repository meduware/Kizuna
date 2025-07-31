import { useChannelContext } from "../ChannelContext";

export const useActiveRole = () => {
    const { activeChannel, setActiveRole, setForm } = useChannelContext();

    const changeActiveRole = (roleId: number | null) => {
        setActiveRole(roleId);
        setForm(activeChannel);
    };

    return { changeActiveRole };
};
