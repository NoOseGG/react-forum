import { Trash2 } from "lucide-react";

import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useDeletePost } from "../../entities/post/hooks/use-delete-post";
import { ConfirmModal } from "../../shared/ui/confirm-modal/confirm-modal";
import styles from "./delete-post-btn.module.css";

interface Props {
  postId: string;
}

export const DeletePostBtn: React.FC<Props> = ({ postId }) => {
  const { mutate } = useDeletePost();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDelete = () => {
    mutate(postId);
    setIsModalOpen(false);
  };

  return (
    <>
      <Trash2
        size={32}
        onClick={e => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.deleteBtn}
        data-tooltip-id='delete'
        data-tooltip-content='Delete post'
      />
      <ReactTooltip id='delete' place='bottom' />

      <ConfirmModal
        isOpen={isModalOpen}
        title='Delete post'
        message='Are you sure you want to delete this post?'
        onConfirm={onDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
