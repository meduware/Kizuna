// hooks/useChangeForm.ts
import { useChannelContext } from "../ChannelContext";

export const useChannelForm = () => {
  const { form, setForm, activeRole } = useChannelContext();

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

  return { changeForm };
};
