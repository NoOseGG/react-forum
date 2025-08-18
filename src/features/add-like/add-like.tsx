import { ThumbsUp } from "lucide-react";

import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useLike } from "../../entities/post/hooks/use-add-like";
import type { Post } from "../../entities/post/model/types";
import { useUser } from "../../entities/user/model/store/user-store";
import styles from "./add-like.module.css";

interface Props {
  post: Post;
}

export const AddLike: React.FC<Props> = ({ post }) => {
  const user = useUser();
  const { mutate: like } = useLike();
  const isLike = user?.id ? post.likedId.includes(user?.id) : null;
  const isDislike = user?.id ? post.dislikedId.includes(user?.id) : null;

  const onLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user?.id) return;

    like({
      post: post,
      userId: user?.id,
      isLiked: isLike,
      isDisliked: isDislike,
    });
  };
  return (
    <>
      <div
        style={{ color: isLike ? "green" : "#fff" }}
        className={styles.infoItem}
      >
        <ThumbsUp
          onClick={onLike}
          className={styles.icon}
          data-tooltip-id='addLike'
          data-tooltip-content='like post'
        />
        : {post.likes}
      </div>
      <ReactTooltip id='addLike' place='bottom' />
    </>
  );
};
