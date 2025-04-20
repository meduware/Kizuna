"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverAddressSchema } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Server } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiHandler } from "@/lib/handlers/api";
import { useGlobalContext } from "@/context/GlobalContext";
import { useTranslation } from "@/hooks/useTranslation";

type ServerAddressFormValues = z.infer<typeof serverAddressSchema>;

interface ServerAddressDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  isAvailable: (arg: boolean) => void;
}

export function IpDialog({
  isOpen,
  onClose,
  isAvailable,
}: ServerAddressDialogProps) {
  const translation = useTranslation();
  const form = useForm<ServerAddressFormValues>({
    resolver: zodResolver(serverAddressSchema),
    defaultValues: {
      ipAddress: "",
      port: "",
    },
  });
  const { reloadServerList } = useGlobalContext();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await apiHandler(
        "http://" +
          data.ipAddress +
          ":" +
          data.port +
          "/api/server-management/is-joinable",
        {},
        "GET",
      );
      if (response.msg === "Server is joinable") {
        isAvailable(true);
        const server = await apiHandler(
          `http://${data.ipAddress}:${data.port}/api/server-management/server-details`,
          {},
          "GET",
        );
        if (!server) {
          throw new Error(translation("Server is not available"));
        }

        // NOTE: This area is adding server in local storage
        const currentServer = {
          ipAddress: data.ipAddress,
          port: data.port,
        };
        let serverList: { ipAddress: string; port: string }[] = [];
        const localServerList = localStorage.getItem("serverList");
        if (localServerList) {
          const parsedLocalServerList = JSON.parse(localServerList);

          if (Array.isArray(parsedLocalServerList)) {
            const exists = parsedLocalServerList.some(
              (server) =>
                server.ipAddress === currentServer.ipAddress &&
                server.port === currentServer.port,
            );

            serverList = exists
              ? parsedLocalServerList
              : [...parsedLocalServerList, currentServer];
          } else {
            serverList = [currentServer];
          }
        } else {
          serverList = [currentServer];
        }
        localStorage.setItem("currentServer", JSON.stringify(currentServer));
        localStorage.setItem("serverList", JSON.stringify(serverList));
        reloadServerList();
        onClose(false);
      } else {
        throw new Error(translation("Server is not joinable"));
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            {translation("Connect to Server")}
          </DialogTitle>
          <DialogDescription>
            {translation(
              "Enter the IP address or domain of the server you want to connect to.",
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="ipAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translation("Server Address")}</FormLabel>
                  <FormControl>
                    <Input placeholder="192.168.1.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input placeholder="8080" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose(false)}
              >
                {translation("Cancel")}
              </Button>
              <Button type="submit">{translation("Connect")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
