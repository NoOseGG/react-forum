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
    onMutate: async ({ post, userId, isLiked, isDisliked }) => {
      await queryClient.cancelQueries({ queryKey: ["post", post.id] });
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPost = queryClient.getQueryData<Post>(["post", post.id]);

      queryClient.setQueryData<Post>(["post", post.id], {
        ...post,
        likes: isLiked ? post.likes - 1 : post.likes + 1,
        likedId: isLiked
          ? post.likedId.filter(id => id !== userId)
          : [...post.likedId, userId],
        dislikes: isDisliked ? post.dislikes - 1 : post.dislikes,
        dislikedId: isDisliked
          ? post.dislikedId.filter(id => id !== userId)
          : post.dislikedId,
      });

      return { previousPost };
    },

    onError: (_err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["post", variables.post.id],
          context.previousPost,
        );
      }
    },

    onSuccess: data => {
      queryClient.setQueryData(["post", data.id], data);
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.post.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
