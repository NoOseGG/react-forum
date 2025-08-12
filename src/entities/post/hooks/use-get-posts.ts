import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../shared/client";
import type { Post } from "../model/types";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosClient.get<Post[]>("/posts");

      return response.data;
    },
  });
};
