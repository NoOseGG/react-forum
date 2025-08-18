import React from "react";

import type { Comment } from "../../entities/comment/model/types/types";
import { DeleteComment } from "../../features/delete-comment";
import styles from "./comment-card.module.css";

interface Props {
  comment: Comment;
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <div className={styles.commentCard}>
      <div className={styles.delete}>
        <DeleteComment commentId={comment.id} />
      </div>
      <div className={styles.title}>
        <span className={styles.name}>{comment.userName}</span>
        <span className={styles.date}>
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.comment}>{comment.text}</div>
    </div>
  );
};
