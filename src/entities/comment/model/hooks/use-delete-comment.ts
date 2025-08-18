import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { Comment } from "../types/types";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.delete(`/comments/${id}`);
      return id;
    },  
    onSuccess: deletedId => {
      queryClient.setQueryData<Comment[]>(["comments"], oldComments => {
        if (!oldComments) return [];
        return oldComments.filter(comment => comment.id !== deletedId);
      });
    },
  });
};
