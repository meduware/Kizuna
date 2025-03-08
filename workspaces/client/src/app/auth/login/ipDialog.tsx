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
  const form = useForm<ServerAddressFormValues>({
    resolver: zodResolver(serverAddressSchema),
    defaultValues: {
      ipAddress: "",
      port: "",
    },
  });

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
      } else {
        throw new Error("Server is not joinable");
      }
    } catch (error) {
      console.log(error);
    }
    //isAvailable(true);
    // onClose(true);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Connect to Server
          </DialogTitle>
          <DialogDescription>
            Enter the IP address or domain of the server you want to connect to.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="ipAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Address</FormLabel>
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
                  <FormLabel>Port (Optional)</FormLabel>
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
                Cancel
              </Button>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
