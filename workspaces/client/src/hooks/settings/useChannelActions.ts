"use client";
import { useChannelContext } from "@/context/settings/ChannelContext";
import { useGlobalContext } from "@/context/GlobalContext";
import { apiHandler } from "@/lib/handlers/api";
import { Channel } from "@shared/types";

export const useChannelActions = () => {
  const {
    setActiveRole,
    setActiveChannel,
    activeChannel,
    activeRole,
    form,
    setForm,
  } = useChannelContext();
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
    console.log(activeChannel);
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

  function changeForm({
    section,
    key,
    value,
  }: {
    section: "channel_details" | "channel_permissions" | "role_permissions";
    key: string;
    value: any;
  }) {
    if (!form) return;

    if (section === "channel_details") {
      setForm({ ...form, [key]: value });
      return;
    }

    if (section === "channel_permissions") {
      setForm({
        ...form,
        channel_permissions: {
          ...form.channel_permissions,
          [key]: value,
        },
      });
      return;
    }

    if (section === "role_permissions" && activeRole !== null) {
      setForm({
        ...form,
        role_permissions: form.role_permissions.map((rp) =>
          rp.role_details.id === activeRole
            ? {
                ...rp,
                permissions: {
                  ...rp.permissions,
                  [key]: value,
                },
              }
            : rp,
        ),
      });
    }
  }

  function changeActiveChannel(channel: Channel) {
    setActiveChannel(channel);
    setActiveRole(null);
    setForm(channel);
  }

  function changeActiveRole(selectedRoleId: number | null) {
    console.log(selectedRoleId);
    setActiveRole(selectedRoleId);
    console.log(activeChannel);
    setForm(activeChannel);
  }

  return {
    updateChannel,
    deleteChannel,
    createChannel,
    changeActiveRole,
    changeForm,
    changeActiveChannel,
  };
};
