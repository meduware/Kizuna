"use client";

import React, { useState } from "react";
import { ChannelList } from "./panels/ChannelList";
import { EmptyChannelState } from "./panels/EmptyChannelState";
import { useTranslation } from "@/hooks/useTranslation";
import { useGlobalContext } from "@/context/store";
import { ChannelEditor } from "./panels/ChannelEditor";
import { LoadingSpinner } from "@/components/(settingspage)/LoadingSpinner";
import { useChannelContext } from "@/context/settings/ChannelContext";
import CreateChannelDialog from "./dialogs/CreateChannelDialog";

export default function RoleManagement() {
  const { currentServer, loading } = useGlobalContext();
  const { activeChannel } = useChannelContext();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const translation = useTranslation();

  if (!currentServer) return null;

  if (loading) {
    return <LoadingSpinner message="Loading Roles" />;
  }

  return (
    <div className="h-full">
      <div className="md:p-4 py-6 overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {translation("Channels")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {translation(
                "Create and manage channels and permissions for your server",
              )}
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-6 h-5/6">
          <CreateChannelDialog
            isOpen={isCreateDialogOpen}
            onClose={() => setIsCreateDialogOpen(false)}
          />
          <ChannelList handleDialogOpen={setIsCreateDialogOpen} />
          {activeChannel ? (
            <ChannelEditor />
          ) : (
            <EmptyChannelState handleDialogOpen={setIsCreateDialogOpen} />
          )}
        </div>
      </div>
    </div>
  );
}
