import type { Post } from "../../../entities/post/model/types";
import type { FilterPost } from "../../../entities/user/model/types/types";

export function getFiltredPost(
  posts: Post[] | undefined,
  filter: FilterPost,
): Post[] | undefined {
  if (!posts) return undefined;

  switch (filter) {
    case "priority":
      return [...posts].sort((a, b) => b.priority - a.priority);
    case "like":
      return [...posts].sort((a, b) => b.likes - a.likes);
    case "dislike":
      return [...posts].sort((a, b) => b.dislikes - a.dislikes);
    case "user":
      return [...posts].sort((a, b) => a.userName.localeCompare(b.userName));
    case "date":
      return [...posts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return posts;
  }
}
