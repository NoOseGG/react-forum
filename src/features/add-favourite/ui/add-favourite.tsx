import { HeartMinus, HeartPlusIcon } from "lucide-react";

import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import type { Post } from "../../../entities/post/model/types";
import { useUser } from "../../../entities/user/model/store/user-store";
import { useFavourite } from "../model/hooks/useFavourite";
import styles from "./add-favourite.module.css";

interface Props {
  post: Post;
}

export const AddFavourite: React.FC<Props> = ({ post }) => {
  const { mutate } = useFavourite();
  const user = useUser();
  const isFavourite = user?.id ? post.favouriteIds.includes(user.id) : false;

  const onFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id) return;
    mutate({
      post: post,
      userId: user?.id,
      isFavourite: isFavourite,
    });
  };

  return (
    <div className={styles.favourite} onClick={onFavourite}>
      {isFavourite ? (
        <HeartMinus
          size={32}
          data-tooltip-id='deleteFavourite'
          data-tooltip-content='Delete a post from favorites'
        />
      ) : (
        <HeartPlusIcon
          size={32}
          data-tooltip-id='addFavourite'
          data-tooltip-content='Add a post to favorites'
        />
      )}
      <ReactTooltip id='deleteFavourite' place='bottom' />
      <ReactTooltip id='addFavourite' place='bottom' />
    </div>
  );
};
