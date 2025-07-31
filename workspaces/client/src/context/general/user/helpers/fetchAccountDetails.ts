import { getCurrentAccountToken } from "@/lib/utils";
import { createSupabaseClient } from "@shared/supabase/createClient";
import { Server, userData } from "@/lib/types";

export async function fetchAccountDetails({
  currentServer,
  setLoading,
  setCurrentUser,
}: {
  currentServer: Server | null;
  setLoading: (loading: boolean) => void;
  setCurrentUser: (user: userData | null) => void;
}) {
  const supabase = createSupabaseClient();

  setLoading(true);
  try {
    const accountId = getCurrentAccountToken(currentServer);
    if (!accountId) return;

    const { data, error } = await supabase
      .from("user_roles")
      .select(
        `
        id,
        user:users(id, username, email, photo_url),
        role:roles(role_name, role_color, permissions)
      `,
      )
      .eq("user_id", accountId)
      .single<userData>();

    if (error) {
      console.error("Error fetching account details:", error);
      return;
    }

    setCurrentUser(data);
  } catch (error) {
    console.error("Error fetching account details:", error);
  } finally {
    setLoading(false);
  }
}
