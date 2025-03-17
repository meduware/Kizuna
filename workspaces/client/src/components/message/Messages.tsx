import { useGlobalContext } from "@/context/store";
import { createSupabaseClient } from "@shared/supabase/createClient";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFormattedDate } from "@/lib/translation";
import { ChevronDown, MessagesSquare, OctagonAlert } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ImagePreview } from "@/lib/handlers/imagePreview";

const Messages = () => {
  const { currentUser, currentChannel } = useGlobalContext();
  const supabase = createSupabaseClient();
  const [messages, setMessages] = useState<any[]>([]);
  const formattedDate = useFormattedDate();
  const translate = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (messagesEndRef.current && isAtBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    if (!currentChannel) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          message,
          files,
          created_at,
          userData:user_roles(
            id,
            user:users(id, username, photo_url),
            role:roles(
              role_name,
              role_color,
              permissions
            )
          )
        `,
        )
        .eq("channel_id", currentChannel)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      setMessages(data || []);
    };

    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${currentChannel}`,
        },
        async (payload) => {
          const { data: userData, error: userError } = await supabase
            .from("user_roles")
            .select(
              `
            id,
            user:users(id, username, photo_url),
            role:roles(
              role_name,
              role_color,
              permissions
            )
          `,
            )
            .eq("id", payload.new.user_role_id)
            .single();

          if (userError) {
            console.error("Error fetching user:", userError);
            return;
          }

          const newMessage = {
            channel_id: payload.new.channel_id,
            created_at: payload.new.created_at,
            files: payload.new.files,
            id: payload.new.id,
            message: payload.new.message,
            userData,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannel]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!currentUser) {
    if (!currentChannel) return null;
    return (
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <OctagonAlert
          width={100}
          height={100}
          className="text-primary -mt-24"
        />
        <h1 className="text-foreground sm:text-lg text-md">
          {translate("You need to be logged in to see messages.")}
        </h1>
      </div>
    );
  }

  return (
    <div
      className="p-4 h-full overflow-y-auto"
      onScroll={handleScroll}
      style={{ maxHeight: "100vh" }}
    >
      <div className="p-4 h-full">
        <div className="space-y-2 h-full">
          {messages.length === 0 ? (
            <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
              <MessagesSquare
                width={100}
                height={100}
                className="text-primary -mt-24"
              />

              <h1 className="text-foreground text-lg">
                {translate("No messages yet.")}
              </h1>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="flex gap-5 justify-start items-start hover:bg-secondary p-2 rounded-md text-foreground"
              >
                <Avatar className="h-10 w-10 mt-2">
                  <AvatarImage src={msg.userData.user.photo_url} />

                  <AvatarFallback className="text-2xl">
                    {msg.userData.user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <h3
                      className="font-medium truncate max-w-[300px]"
                      style={{ color: msg.userData.role.role_color }}
                    >
                      {msg.userData.user.username}
                    </h3>

                    <h4 className="text-xs text-gray-500">
                      {formattedDate(msg.created_at)}
                    </h4>
                  </div>

                  <div>
                    <p className="break-all">{msg.message}</p>

                    {msg.files.length > 0 && (
                      <ImagePreview images={msg.files} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          <div ref={messagesEndRef} />
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-32 right-6 p-3 bg-primary hover:bg-primary/80 transition-all rounded-md shadow-lg"
            >
              <ChevronDown />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
