import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { User } from "../types/types";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosClient.get<User[]>("/users");

      return response.data;
    },
  });
};
