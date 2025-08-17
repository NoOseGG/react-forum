import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { User } from "../types/types";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: User) => {
      console.log("updated", user);

      const response = await axiosClient.put(`/users/${user.id}`, user);

      return response.data;
    },
    onSuccess: updatedUser => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
