import { ThumbsDown, ThumbsUp } from "lucide-react";

import React from "react";

import { useUser } from "../../../user/model/store/user-store";
import type { Post } from "../../model/types";
import styles from "./post-card.module.css";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const isLike = user?.id ? post.likedId.includes(user?.id) : null;
  const isDislike = user?.id ? post.dislikedId.includes(user?.id) : null;

  return (
    <div className={styles.post}>
      <div className={styles.title}>{post.title}</div>
      <span className={styles.body}>{post.body}</span>
      <div className={styles.info}>
        <div
          style={{ color: isLike ? "green" : "#fff" }}
          className={styles.infoItem}
        >
          <ThumbsUp className={styles.icon} />: {post.likes}
        </div>
        <div
          style={{ color: isDislike ? "red" : "#fff" }}
          className={styles.infoItem}
        >
          <ThumbsDown className={styles.icon} />: {post.dislikes}
        </div>
      </div>
    </div>
  );
};
