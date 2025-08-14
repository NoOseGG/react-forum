import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../shared/client";
import type { Post } from "../model/types";

export const useDislike = () => {
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
        likes: data.isLiked ? data.post.likes - 1 : data.post.likes,
        likedId: data.isLiked
          ? data.post.likedId.filter(id => id !== data.userId)
          : data.post.likedId,

        dislikes: data.isDisliked
          ? data.post.dislikes - 1
          : data.post.dislikes + 1,
        dislikedId: data.isDisliked
          ? data.post.dislikedId.filter(id => id !== data.userId)
          : [...data.post.dislikedId, data.userId],
      };

      const response = await axiosClient.put(
        `/posts/${data.post.id}`,
        updatedPost,
      );

      console.log(updatedPost);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
