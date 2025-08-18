import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "../../../../shared/client";
import type { CommentRequest } from "../types/types";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: CommentRequest) => {
      const response = await axiosClient.post<Comment>("/comments", comment);
      return response.data;
    },
    onSuccess: newComment => {
      queryClient.setQueryData<Comment[]>(["comments"], oldComments => {
        if (!oldComments) return [newComment];
        return [...oldComments, newComment]; // добавляем в конец
      });
    },
  });
};
