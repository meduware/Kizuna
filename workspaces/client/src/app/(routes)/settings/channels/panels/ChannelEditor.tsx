import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChannelRole } from "@shared/types";
import { ChannelGeneralSettings } from "../channel-settings/GeneralSettings";
import { Permissions } from "../channel-settings/Permissions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from "@/context/GlobalContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useChannelContext } from "@/context/settings/channels/ChannelContext";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useChannelSettingsHook } from "@/context/settings/channels";

export function ChannelEditor() {
  const { currentServer } = useGlobalContext();
  const { updateChannel, deleteChannel, changeActiveRole } =
    useChannelSettingsHook();
  const { activeChannel, setActiveChannel, form, setForm } =
    useChannelContext();
  const translation = useTranslation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  useEffect(() => {
    if (
      selectedRole &&
      !activeChannel?.role_permissions.some(
        (r) => r.role_details.role_name === selectedRole,
      )
    ) {
      setSelectedRole(null);
      changeActiveRole(null);
    }
  }, [activeChannel, selectedRole, changeActiveRole]);

  // TODO: Add a template for this section.
  if (!activeChannel) return null;

  const changeSelectedRole = (selectedRole: ChannelRole) => {
    console.log(selectedRole);
    changeActiveRole(selectedRole.role_details.id);
    setSelectedRole(selectedRole.role_details.role_name);
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{translation("Channel Settings")}</CardTitle>
        <CardDescription className="flex items-center">
          <span className="sm:block hidden w-full">
            {translation("Edit channel details and permissions")}
          </span>
          <span className="sm:hidden w-full" />
          <span className="w-[250px] gap-5 flex justify-end items-center">
            <Popover>
              <PopoverTrigger className="w-fit flex justify-end hover:text-primary">
                <PlusCircle />
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {translation("Add role")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {translation(
                        "Add a new role permission to this channel.",
                      )}
                    </p>
                  </div>
                  {currentServer &&
                    currentServer.roles.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{role.role_name}</p>
                        </div>
                        <div>
                          <Switch
                            checked={activeChannel.role_permissions.some(
                              (r) => r.role_details.id === role.id,
                            )}
                            onCheckedChange={() => {
                              if (!activeChannel || !form) return;

                              const roleExists =
                                activeChannel.role_permissions.some(
                                  (r) => r.role_details.id === role.id,
                                );

                              if (roleExists) {
                                const updatedRolePermissions =
                                  activeChannel.role_permissions.filter(
                                    (r) => r.role_details.id !== role.id,
                                  );

                                const updatedFormRolePermissions =
                                  form.role_permissions.filter(
                                    (r) => r.role_details.id !== role.id,
                                  );

                                if (selectedRole === role.role_name) {
                                  setSelectedRole(null);
                                  changeActiveRole(null);
                                }

                                setActiveChannel({
                                  ...activeChannel,
                                  role_permissions: updatedRolePermissions,
                                });

                                setForm({
                                  ...form,
                                  role_permissions: updatedFormRolePermissions,
                                });
                              } else {
                                const newPermission = {
                                  role_details: role,
                                  permissions: {
                                    ...activeChannel.channel_permissions,
                                    cooldown: activeChannel.cooldown,
                                  },
                                };

                                setActiveChannel({
                                  ...activeChannel,
                                  role_permissions: [
                                    ...activeChannel.role_permissions,
                                    newPermission,
                                  ],
                                });

                                setForm({
                                  ...form,
                                  role_permissions: [
                                    ...form.role_permissions,
                                    newPermission,
                                  ],
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </PopoverContent>
            </Popover>
            {activeChannel!.role_permissions.length > 0 && currentServer && (
              <Select
                onValueChange={(e) =>
                  changeSelectedRole(
                    activeChannel.role_permissions.filter(
                      (role) => role.role_details.role_name == e,
                    )[0] as ChannelRole,
                  )
                }
                value={selectedRole ? selectedRole : ""}
              >
                <SelectTrigger id="channel-type">
                  <SelectValue placeholder={translation("Select a role")} />
                </SelectTrigger>
                <SelectContent>
                  {activeChannel.role_permissions.map(
                    (role: any, index: number) => (
                      <SelectItem
                        value={role.role_details.role_name}
                        key={index}
                      >
                        {role.role_details.role_name}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            )}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="General">
          <TabsList className="mb-4 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full h-full">
            <TabsTrigger
              value="General"
              className="xl:col-span-1 sm:col-span-2 w-full"
            >
              {translation("General")}
            </TabsTrigger>
            <TabsTrigger value="Channel Permissions">
              {translation("Channel Permisions")}
            </TabsTrigger>
            <TabsTrigger value="Role Permissions">
              {translation("Role Permissions")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="General">
            <ChannelGeneralSettings />
          </TabsContent>

          <TabsContent value="Channel Permissions">
            <Permissions section="channel_permissions" />
          </TabsContent>

          <TabsContent value="Role Permissions">
            <Permissions section="role_permissions" />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex sm:flex-row flex-col w-full justify-between gap-5">
        <Button
          variant="outline"
          onClick={() => deleteChannel(activeChannel.id)}
          className="sm:order-1 order-2 sm:w-fit w-full"
        >
          {translation("Delete Channel")}
        </Button>
        <Button
          className="sm:order-2 order-1 sm:w-fit w-full"
          onClick={updateChannel}
        >
          {translation("Save Changes")}
        </Button>
      </CardFooter>
    </Card>
  );
}
