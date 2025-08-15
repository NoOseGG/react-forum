import { useNavigate } from "@tanstack/react-router";

import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

import { useGetPosts } from "../../entities/post/hooks/use-get-posts";
import {
  useFilterPost,
  useUser,
} from "../../entities/user/model/store/user-store";
import { getFiltredPost } from "../../features/filter-post/lib/utils";
import { FilterPost } from "../../features/filter-post/ui";
import { PostCard } from "../../widgets/post-card/post-card";
import styles from "./favourite-posts-page.module.css";

export const FavouritePostsPage = () => {
  const user = useUser();
  const { data, isFetching } = useGetPosts();
  const filter = useFilterPost();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/" });
    }
  }, [user]);

  const favouritePosts = user?.id
    ? data?.filter(post => post.favouriteIds.includes(user.id))
    : [];

  const filtredData = getFiltredPost(favouritePosts, filter);

  return (
    <div className={styles.favouritePage}>
      <h2 className={styles.title}>Favourite Posts</h2>
      <FilterPost />
      <div className={styles.posts}>
        {filtredData &&
          filtredData?.map(post => <PostCard post={post} key={post.id} />)}
      </div>
      {isFetching && !data && (
        <div className={styles.spinner}>
          <ClipLoader color='#fff' size={150} />
        </div>
      )}
    </div>
  );
};
