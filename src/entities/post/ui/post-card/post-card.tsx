import { ThumbsDown, ThumbsUp } from "lucide-react";

import React from "react";

import { useUser } from "../../../user/model/store/user-store";
import { useLike } from "../../hooks/use-add-like";
import type { Post } from "../../model/types";
import { DeletePostBtn } from "../delete-post-btn";
import styles from "./post-card.module.css";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const { mutate } = useLike();
  const isLike = user?.id ? post.likedId.includes(user?.id) : null;
  const isDislike = user?.id ? post.dislikedId.includes(user?.id) : null;

  const onLike = () => {
    if (!user?.id) return;
    mutate({
      post: post,
      userId: user?.id,
    });
  };

  return (
    <div className={styles.post}>
      {user?.role === "admin" ? (
        <DeletePostBtn postId={post.id} />
      ) : (
        user?.id === post.userId && <DeletePostBtn postId={post.id} />
      )}
      <div className={styles.title}>{post.title}</div>
      <span className={styles.body}>{post.body}</span>
      <div className={styles.info}>
        <div
          style={{ color: isLike ? "green" : "#fff" }}
          className={styles.infoItem}
        >
          <ThumbsUp onClick={onLike} className={styles.icon} />: {post.likes}
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
