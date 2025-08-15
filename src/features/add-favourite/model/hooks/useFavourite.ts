import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Post } from "../../../../entities/post/model/types";
import { axiosClient } from "../../../../shared/client";

export const useFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      post: Post;
      userId: string;
      isFavourite: boolean;
    }) => {
      const updatedPost: Post = {
        ...data.post,
        favouriteIds: data.isFavourite
          ? data.post.favouriteIds.filter(id => id !== data.userId)
          : [...data.post.favouriteIds, data.userId],
      };

      const response = await axiosClient.put(
        `/posts/${data.post.id}`,
        updatedPost,
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
