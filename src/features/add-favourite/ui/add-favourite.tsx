import { HeartMinus, HeartPlus, HeartPlusIcon } from "lucide-react";

import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import type { Post } from "../../../entities/post/model/types";
import { useFavourite } from "../model/hooks/useFavourite";
import styles from "./add-favourite.module.css";

interface Props {
  isFavourite: boolean;
  post: Post;
  userId: string | undefined;
}

export const AddFavourite: React.FC<Props> = ({
  isFavourite,
  post,
  userId,
}) => {
  const { mutate } = useFavourite();

  const onFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userId) return;
    mutate({
      post: post,
      userId: userId,
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
