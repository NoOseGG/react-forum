import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { User } from "../types/types";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosClient.get<User>(`/users/${id}`);

      return response.data;
    },
    enabled: !!id,
  });
};
