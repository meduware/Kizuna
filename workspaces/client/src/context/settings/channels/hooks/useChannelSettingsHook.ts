import { useActiveChannel } from "./useActiveChannel";
import { useActiveRole } from "./useActiveRole";
import { useChannelActions } from "./useChannelActions";
import { useChannelForm } from "./useChannelForm";

export const useChannelSettingsHook = () => {
    return {
        ...useActiveChannel(),
        ...useActiveRole(),
        ...useChannelForm(),
        ...useChannelActions(),
    };
};
