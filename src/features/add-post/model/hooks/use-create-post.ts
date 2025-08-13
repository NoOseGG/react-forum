import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { PostRequest } from "../../../../entities/post/model/types";
import { axiosClient } from "../../../../shared/client";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (post: PostRequest) => {
      const response = await axiosClient.post("/posts", post);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      console.log("validate");

      navigate({ to: "/posts" });
    },
  });
};
