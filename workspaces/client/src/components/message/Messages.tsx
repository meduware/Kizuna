import { useGlobalContext } from "@/context/GlobalContext";
import { createSupabaseClient } from "@shared/supabase/createClient";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFormattedDate } from "@/lib/translation";
import { ChevronDown, MessagesSquare, OctagonAlert } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ImagePreview } from "@/lib/handlers/imagePreview";

const Messages = () => {
  const { currentUser, currentChannel, messages, setMessages, fetchMessages } =
    useGlobalContext();
  const supabase = createSupabaseClient();
  const formattedDate = useFormattedDate();
  const translation = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container && container.scrollHeight <= container.clientHeight) {
        setIsAtBottom(true);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current && isAtBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    if (!currentChannel) return;

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

          setMessages((prevMessages: any) => [...prevMessages, newMessage]);
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

    if (scrollHeight <= clientHeight) {
      setIsAtBottom(true);
    } else {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 50);
      }, 100);
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
          {translation("You need to be logged in to see messages.")}
        </h1>
      </div>
    );
  }

  return (
    <div
      className="p-4 h-full mb-24 my-16 overflow-auto"
      onScroll={handleScroll}
      style={{ maxHeight: "100vh" }}
    >
      <div className="space-y-2 p-4 h-full w-full">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-5 h-[calc(100vh-200px)] items-center justify-center">
            <MessagesSquare width={100} height={100} className="text-primary" />

            <h1 className="text-foreground text-lg">
              {translation("No messages yet.")}
            </h1>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="flex gap-5 justify-start items-start hover:bg-accent p-4 pt-2 rounded-md text-foreground"
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

                  {msg.files.length > 0 && <ImagePreview images={msg.files} />}
                </div>
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
        {!isAtBottom && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-32 right-6 p-3 bg-primary  transition-all rounded-md shadow-lg"
          >
            <ChevronDown />
          </button>
        )}
      </div>
    </div>
  );
};

export default Messages;
