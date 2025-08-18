import React, { useState } from "react";

import { useAddComment } from "../../entities/comment/model/hooks/use-add-comment";
import type { CommentRequest } from "../../entities/comment/model/types/types";
import type { Post } from "../../entities/post/model/types";
import { useUser } from "../../entities/user/model/store/user-store";
import styles from "./add-comment.module.css";

interface Props {
  post: Post;
}

export const AddComment: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const [text, setText] = useState("");
  const { mutate } = useAddComment();

  const handleAdd = () => {
    if (!text.trim() || !user) return;

    const comment: CommentRequest = {
      userName: user?.name,
      userId: user.id,
      text: text,
      postId: post.id,
    };
    mutate(comment);

    setText("");
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className={styles.container}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='Write a comment...'
        rows={4}
        className={styles.textarea}
      />
      <div className={styles.actions}>
        <button onClick={handleAdd} className={styles.btnAdd}>
          Add
        </button>
        <button onClick={handleClear} className={styles.btnClear}>
          Clear
        </button>
      </div>
    </div>
  );
};
