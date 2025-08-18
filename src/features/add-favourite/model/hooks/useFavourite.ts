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

    onMutate: async data => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], oldPosts =>
          oldPosts
            ? oldPosts.map(post =>
                post.id === data.post.id
                  ? {
                      ...post,
                      favouriteIds: data.isFavourite
                        ? post.favouriteIds.filter(id => id !== data.userId)
                        : [...post.favouriteIds, data.userId],
                    }
                  : post,
              )
            : [],
        );
      }

      return { previousPosts };
    },

    onError: (_err, _data, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.post.id] });
    },
  });
};
