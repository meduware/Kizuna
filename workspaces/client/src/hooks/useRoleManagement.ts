import { useState, useCallback, useEffect } from "react";
import { Role } from "@shared/types";
import { apiHandler } from "@/lib/handlers/api";
import { useToast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/context/GlobalContext";
import { useTranslation } from "@/hooks/useTranslation";

export function useRoleManagement() {
  const { currentServer } = useGlobalContext();
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const translation = useTranslation();

  const fetchRolesWithUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiHandler(
        "/api/role-management/get-roles-with-users",
        null,
        "GET",
      );
      setRoles(response);
    } catch (err) {
      console.error("Error fetching roles:", err);
      toast({
        title: translation("Failed"),
        description: translation("Error fetching roles"),
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRolesWithUsers();
  }, [fetchRolesWithUsers]);

  const createRole = useCallback(
    async (roleName: string, roleColor: string) => {
      try {
        await apiHandler(
          "/api/role-management/create-role",
          {
            role_name: roleName,
            role_color: roleColor,
            permissions: JSON.stringify({
              owner: false,
              manage_users: false,
              manage_server: false,
            }),
          },
          "POST",
        );
        await fetchRolesWithUsers();
        toast({
          title: translation("Success"),
          description: translation("Role Created Successfully") ,
        });
        return true;
      } catch (err) {
        console.error("Error While Creating Role", err);
        toast({
          title: translation("Failed"),
          description: translation("Error While Creating Role"),
        });
        return false;
      }
    },
    [fetchRolesWithUsers, toast], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const deleteRole = useCallback(
    async (roleId: number) => {
      try {
        await apiHandler(
          "/api/role-management/delete-role",
          { id: roleId },
          "DELETE",
        );
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
        toast({
          title: translation("Success"),
          description: translation("Role Deleted Successfully"),
        });
        setActiveRole(null);
        return true;
      } catch (error) {
        console.error("Error while deleting role", error);
        toast({
          title: translation("Failed"),
          description: translation("Something went wrong"),
        });
        return false;
      }
    },
    [toast], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const updateRole = useCallback(
    async (role: Role) => {
      try {
        await apiHandler(
          "/api/role-management/update-roles",
          {
            id: role.id,
            role_name: role.role_name,
            role_color: role.role_color,
            permissions: JSON.stringify(role.permissions),
          },
          "PUT",
        );
        toast({
          title: translation("Success"),
          description: translation("Role Updated Successfully"),
        });
        return true;
      } catch (err) {
        console.error("Error While Updating Role", err);
        toast({
          title: translation("Failed"),
          description: "Error While Updating Role",
        });
        return false;
      }
    },
    [toast], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const removeUserFromRole = useCallback(
    async (userId: string, roleId: number) => {
      if (!activeRole) return false;

      try {
        await apiHandler(
          "/api/role-management/add-role",
          {
            role_id: 1, // Need a Default role id @everyone
            user_id: userId,
          },
          "POST",
        );

        setRoles((prevRoles) =>
          prevRoles.map((role) => {
            if (role.id === roleId) {
              return {
                ...role,
                users: role.users.filter((user) => user.id !== userId),
              };
            }
            return role;
          }),
        );

        if (activeRole && activeRole.id === roleId) {
          setActiveRole({
            ...activeRole,
            users: activeRole.users.filter((user) => user.id !== userId),
          });
        }

        await fetchRolesWithUsers();
        return true;
      } catch (err) {
        console.error("Error removing user from role", err);
        toast({
          title: translation("Failed"),
          description: translation("Error removing user from role"),
        });
        return false;
      }
    },
    [activeRole, fetchRolesWithUsers, toast], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const updateActiveRole = useCallback(
    (updates: Partial<Role>) => {
      if (!activeRole) return;

      const updatedRole = { ...activeRole, ...updates };

      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === activeRole.id ? updatedRole : role,
        ),
      );

      setActiveRole(updatedRole);
    },
    [activeRole],
  );

  const togglePermission = useCallback(
    (permissionId: string) => {
      if (!activeRole) return;

      updateActiveRole({
        permissions: {
          ...activeRole.permissions,
          [permissionId]: !activeRole.permissions[permissionId],
        },
      });
    },
    [activeRole, updateActiveRole],
  );

  return {
    roles,
    loading,
    activeRole,
    setActiveRole,
    createRole,
    deleteRole,
    updateRole,
    removeUserFromRole,
    updateActiveRole,
    togglePermission,
  };
}
