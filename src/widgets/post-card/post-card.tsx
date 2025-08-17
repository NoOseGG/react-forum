import { ThumbsDown, ThumbsUp } from "lucide-react";

import React from "react";

import { useDislike } from "../../entities/post/hooks/use-add-dislike";
import { useLike } from "../../entities/post/hooks/use-add-like";
import type { Post } from "../../entities/post/model/types";
import { useUser } from "../../entities/user/model/store/user-store";
import { useFavourite } from "../../features/add-favourite/model/hooks/useFavourite";
import { AddFavourite } from "../../features/add-favourite/ui";
import { DeletePostBtn } from "../../features/delete-post-btn";
import styles from "./post-card.module.css";

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const { mutate: like } = useLike();
  const { mutate: dislike } = useDislike();
  const isLike = user?.id ? post.likedId.includes(user?.id) : null;
  const isDislike = user?.id ? post.dislikedId.includes(user?.id) : null;
  const isFavourite = user?.id ? post.favouriteIds.includes(user.id) : false;

  const onLike = () => {
    if (!user?.id) return;
    like({
      post: post,
      userId: user?.id,
      isLiked: isLike,
      isDisliked: isDislike,
    });
  };

  const onDislike = () => {
    if (!user?.id) return;
    dislike({
      post: post,
      userId: user?.id,
      isLiked: isLike,
      isDisliked: isDislike,
    });
  };

  return (
    <div className={styles.post}>
      <div className={styles.buttonsContainer}>
        <AddFavourite post={post} userId={user?.id} isFavourite={isFavourite} />
        {user?.role === "admin" ? (
          <DeletePostBtn postId={post.id} />
        ) : (
          user?.id === post.userId && <DeletePostBtn postId={post.id} />
        )}
      </div>
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
          <ThumbsDown onClick={onDislike} className={styles.icon} />:{" "}
          {post.dislikes}
        </div>
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
