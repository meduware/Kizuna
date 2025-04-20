"use client";
import { createContext, useContext, useState } from "react";
import { Channel, Form } from "@shared/types";

type ChannelContextType = {
  activeChannel: Channel | null;
  setActiveChannel: (channel: Channel | null) => void;
  activeRole: number | null;
  setActiveRole: (role: number | null) => void;
  form: Channel | null;
  setForm: (form: Channel | null) => void;
};

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [form, setForm] = useState<Channel | null>(null);

  return (
    <ChannelContext.Provider
      value={{
        activeChannel,
        setActiveChannel,
        activeRole,
        setActiveRole,
        form,
        setForm,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = () => {
  const context = useContext(ChannelContext);
  if (!context)
    throw new Error("useChannelContext must be used within ChannelProvider");
  return context;
};
