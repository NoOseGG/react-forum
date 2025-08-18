import { ThumbsDown } from "lucide-react";

import React from "react";

import { useDislike } from "../../entities/post/hooks/use-add-dislike";
import type { Post } from "../../entities/post/model/types";
import { useUser } from "../../entities/user/model/store/user-store";
import styles from "./add-dislike.module.css";

interface Props {
  post: Post;
}

export const AddDislike: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const { mutate: dislike } = useDislike();
  const isLike = user?.id ? post.likedId.includes(user?.id) : null;
  const isDislike = user?.id ? post.dislikedId.includes(user?.id) : null;

  const onDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id) return;

    dislike({
      post: post,
      userId: user?.id,
      isLiked: isLike,
      isDisliked: isDislike,
    });
  };
  return (
    <div
      style={{ color: isDislike ? "red" : "#fff" }}
      className={styles.infoItem}
    >
      <ThumbsDown onClick={onDislike} className={styles.icon} />:{" "}
      {post.dislikes}
    </div>
  );
};
