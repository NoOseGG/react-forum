import { useNavigate } from "@tanstack/react-router";

import React from "react";

import type { Post } from "../../entities/post/model/types";
import { useUser } from "../../entities/user/model/store/user-store";
import { AddDislike } from "../../features/add-dislike";
import { AddFavourite } from "../../features/add-favourite/ui";
import { AddLike } from "../../features/add-like/add-like";
import { DeletePostBtn } from "../../features/delete-post-btn";
import styles from "./post-card.module.css";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const navigate = useNavigate();

  const onClickPost = () => {
    console.log("click");

    navigate({ to: "/post-info", search: { id: post.id } });
  };

  return (
    <div className={styles.post} onClick={onClickPost}>
      <div className={styles.buttonsContainer}>
        {user && <AddFavourite post={post} />}
        {user?.role === "admin" ? (
          <DeletePostBtn postId={post.id} />
        ) : (
          user?.id === post.userId && <DeletePostBtn postId={post.id} />
        )}
      </div>
      <div className={styles.title}>{post.title}</div>
      <span className={styles.body}>{post.body}</span>
      <div className={styles.info}>
        <AddLike post={post} />
        <AddDislike post={post} />
        <div className={styles.userInfo}>
          <div className={styles.userName}>{post.userName}</div>
          <div className={styles.date}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
