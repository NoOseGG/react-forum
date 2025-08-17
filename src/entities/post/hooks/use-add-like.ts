import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../shared/client";
import type { Post } from "../model/types";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      post: Post;
      userId: string;
      isLiked: boolean | null;
      isDisliked: boolean | null;
    }) => {
      const updatedPost: Post = {
        ...data.post,
        likes: data.isLiked ? data.post.likes - 1 : data.post.likes + 1,
        likedId: data.isLiked
          ? data.post.likedId.filter(id => id !== data.userId)
          : [...data.post.likedId, data.userId],

        dislikes: data.isDisliked ? data.post.dislikes - 1 : data.post.dislikes,
        dislikedId: data.isDisliked
          ? data.post.dislikedId.filter(id => id !== data.userId)
          : data.post.dislikedId,
      };

      const response = await axiosClient.put(
        `/posts/${data.post.id}`,
        updatedPost,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
