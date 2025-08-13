import { Trash2 } from "lucide-react";

import React from "react";

import { useDeletePost } from "../../hooks/use-delete-post";
import styles from "./delete-post-btn.module.css";

interface Props {
  postId: string;
}

export const DeletePostBtn: React.FC<Props> = ({ postId }) => {
  const { mutate } = useDeletePost();

  const onDelete = (postId: string) => {
    mutate(postId);
  };

  return (
    <Trash2
      size={28}
      onClick={() => onDelete(postId)}
      className={styles.deleteBtn}
    />
  );
};
