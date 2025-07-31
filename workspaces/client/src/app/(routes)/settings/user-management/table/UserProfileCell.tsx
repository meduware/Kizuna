import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@shared/types";

export function UserProfileCell({ user }: { user: User }): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.photo_url} />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{user.username}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
}
