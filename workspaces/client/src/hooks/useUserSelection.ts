// src/hooks/useUserSelection.ts
import { useState, useCallback, useEffect } from "react";
import { User } from "@shared/types";

export function useUserSelection(users: User[]) {
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll && checkedUsers.length !== users.length) {
      setCheckedUsers(users.map((user) => user.id));
    }

    if (!selectAll && users.length > 0 && checkedUsers.length === users.length) {
      setSelectAll(true);
    }
  }, [users, selectAll, checkedUsers]);

  const handleSelectAllChange = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);
      if (checked) {
        setCheckedUsers(users.map((user) => user.id));
      } else {
        setCheckedUsers([]);
      }
    },
    [users]
  );

  const handleUserCheckboxChange = useCallback(
    (userId: string, checked: boolean) => {
      let newCheckedUsers: string[];

      if (checked) {
        newCheckedUsers = [...checkedUsers, userId];
      } else {
        newCheckedUsers = checkedUsers.filter((id) => id !== userId);
        if (selectAll) {
          setSelectAll(false);
        }
      }

      setCheckedUsers(newCheckedUsers);

      if (newCheckedUsers.length === users.length && newCheckedUsers.length > 0) {
        setSelectAll(true);
      }
    },
    [checkedUsers, users, selectAll]
  );

  const isUserChecked = useCallback(
    (userId: string): boolean => {
      return checkedUsers.includes(userId);
    },
    [checkedUsers]
  );

  return {
    checkedUsers,
    selectAll,
    handleSelectAllChange,
    handleUserCheckboxChange,
    isUserChecked,
  };
}
