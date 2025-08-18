export type Comment = {
  createdAt: string;
  userName: string;
  userId: string;
  text: string;
  postId: string;
  id: string;
};

export type CommentRequest = Omit<Comment, "id" | "createdAt">;
