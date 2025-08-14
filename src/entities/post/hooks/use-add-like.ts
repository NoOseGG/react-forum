import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../shared/client";
import type { Post } from "../model/types";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { post: Post; userId: string }) => {
      const isLiked = data.post.likedId.includes(data.userId);
      const isDisliked = data.post.dislikedId.includes(data.userId);

      const updatedPost: Post = {
        ...data.post,
        likes: isLiked ? data.post.likes - 1 : data.post.likes + 1,
        likedId: isLiked
          ? data.post.likedId.filter(id => id !== data.userId)
          : [...data.post.likedId, data.userId],

        dislikes: isDisliked ? data.post.dislikes - 1 : data.post.dislikes,
        dislikedId: isDisliked
          ? data.post.dislikedId.filter(id => id !== data.userId)
          : data.post.dislikedId,
      };

      const response = await axiosClient.put(
        `/posts/${data.post.id}`,
        updatedPost,
      );
      console.log(data.userId);
      console.log(updatedPost);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
