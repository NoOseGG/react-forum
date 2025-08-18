import { Trash2 } from "lucide-react";

import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { useDeleteComment } from "../../entities/comment/model/hooks/use-delete-comment";
import { ConfirmModal } from "../../shared/ui";
import styles from "./delete-comment.module.css";

interface Props {
  commentId: string;
}

export const DeleteComment: React.FC<Props> = ({ commentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteComment();

  const onDelete = () => {
    mutate(commentId);
    setIsModalOpen(false);
  };

  return (
    <>
      <Trash2
        size={24}
        onClick={e => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.deleteBtn}
        data-tooltip-id='delete'
        data-tooltip-content='Delete comment'
      />
      <ReactTooltip id='delete' place='bottom' />

      <ConfirmModal
        isOpen={isModalOpen}
        title='Delete comment'
        message='Are you sure you want to delete this comment?'
        onConfirm={onDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
