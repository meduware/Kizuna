import { useState, useEffect, useCallback } from "react";
import { apiHandler } from "@/lib/handlers/api";
import { User, Role } from "@shared/types";
import { baseUrls } from "@/lib/constants";

export function useUsersManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchRolesWithUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiHandler("/api/role-management/get-roles-with-users", null, "GET");
      setRoles(response);
    } catch (err) {
      console.error("Error fetching roles:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRolesWithUsers();
  }, [fetchRolesWithUsers]);

  const getAllUsers = useCallback((): User[] => {
    const usersMap = new Map<string, User>();

    roles.forEach((role) => {
      role.users.forEach((user) => {
        if (!usersMap.has(user.id)) {
          usersMap.set(user.id, user);
        }
      });
    });

    return Array.from(usersMap.values());
  }, [roles]);

  const users = useCallback(() => {
    const allUsers = getAllUsers();
    if (!searchQuery) return allUsers;

    return allUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [getAllUsers, searchQuery])();

  useEffect(() => {
    if (!isEditDialogOpen) {
      setSelectedFile(null);
    }
  }, [isEditDialogOpen]);

  const handleEditUser = useCallback((user: User) => {
    setSelectedUser({ ...user });
    setIsEditDialogOpen(true);
  }, []);

  const handleRoleManagement = useCallback((user: User) => {
    setSelectedUser({ ...user });
    setSelectedFile(null);
    setIsRoleDialogOpen(true);
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        username: newUsername,
      });
    }
  };

  const handleAvatarChange = useCallback(
    async (file: File) => {
      if (!selectedUser) return null;

      try {
        setSelectedFile(file);

        const previewUrl = URL.createObjectURL(file);

        setSelectedUser((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            photo_url: previewUrl,
          };
        });

        return previewUrl;
      } catch (err) {
        console.error("Error handling avatar:", err);
        return null;
      }
    },
    [selectedUser]
  );

  const handleRemoveUser = useCallback(
    async (userId: string) => {
      if (window.confirm("Are you sure you want to remove this user from the server?")) {
        try {
          await apiHandler(`/api/user-management/delete-user/${userId}`, null, "DELETE");
          await fetchRolesWithUsers();
        } catch (err) {
          console.error("Error removing user:", err);
        }
      }
    },
    [fetchRolesWithUsers]
  );

  const handleSaveUserDetails = useCallback(async () => {
    if (selectedUser) {
      try {
        const formData = new FormData();
        formData.append("id", selectedUser.id);
        formData.append("username", selectedUser.username);

        if (selectedFile) {
          formData.append("photo", selectedFile);
        }

        await fetch(`${baseUrls.API}/api/user-management/update-user`, {
          method: "PUT",
          body: formData,
        });

        setIsEditDialogOpen(false);
        setSelectedFile(null);
        await fetchRolesWithUsers();
      } catch (err) {
        console.error("Error updating user:", err);
        await fetchRolesWithUsers();
      }
    }
  }, [selectedUser, selectedFile, fetchRolesWithUsers]);

  const handleSaveRoles = useCallback(
    async (roleId: number) => {
      if (selectedUser) {
        try {
          await apiHandler(
            "/api/role-management/add-role",
            {
              role_id: roleId.toString(),
              user_id: selectedUser.id,
            },
            "POST"
          );

          setRoles((prevRoles) => {
            return prevRoles.map((role) => {
              if (role.id === roleId) {
                const userExists = role.users.some((user) => user.id === selectedUser.id);

                if (!userExists) {
                  return {
                    ...role,
                    users: [...role.users, selectedUser],
                  };
                }
              } else {
                return {
                  ...role,
                  users: role.users.filter((user) => user.id !== selectedUser.id),
                };
              }
              return role;
            });
          });
        } catch (err) {
          console.error("Error updating user roles:", err);
          await fetchRolesWithUsers();
        }
      }
    },
    [selectedUser, fetchRolesWithUsers]
  );

  return {
    roles,
    users,
    searchQuery,
    selectedUser,
    isEditDialogOpen,
    isRoleDialogOpen,
    isLoading,
    setSearchQuery,
    setIsEditDialogOpen,
    setIsRoleDialogOpen,
    handleEditUser,
    handleRoleManagement,
    handleRemoveUser,
    handleSaveUserDetails,
    handleSaveRoles,
    handleUsernameChange,
    handleAvatarChange,
    refreshData: fetchRolesWithUsers,
  };
}
