export type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
  likes: number;
  dislikes: number;
  likedId: string[];
  dislikedId: string[];
  priority: number;
  userName: string;
  createdAt: string;
  favouriteIds: string[];
};

export type PostRequest = Omit<Post, "id" | "createdAt">;
