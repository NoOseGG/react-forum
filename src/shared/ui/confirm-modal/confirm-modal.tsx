import React from "react";

import styles from "./confirm-modal.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirm action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
