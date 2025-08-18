import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../shared/client";
import type { Post } from "../model/types";

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await axiosClient.get<Post>(`/posts/${id}`);

      return response.data;
    },
    enabled: !!id,
  });
};
