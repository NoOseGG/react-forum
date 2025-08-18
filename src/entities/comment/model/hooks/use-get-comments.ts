import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { Comment } from "../types/types";

export const useGetComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await axiosClient.get<Comment[]>("/comments");

      return response.data;
    },
  });
};
