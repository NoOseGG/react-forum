import { useSearch } from "@tanstack/react-router";

import { useGetPostById } from "../../entities/post/hooks/use-get-post-by-id";
import { AddDislike } from "../../features/add-dislike";
import { AddLike } from "../../features/add-like";
import styles from "./post-info-page.module.css";

export const PostInfoPage = () => {
  const { id } = useSearch({ strict: false });
  const { data: post } = useGetPostById(id);

  return (
    <div className={styles.postInfoPage}>
      <h2 className={styles.title}>Post Info</h2>
      {post && (
        <>
          <div className={styles.postTitle}>{post?.title}</div>
          <div className={styles.postText}>{post?.body}</div>

          <div className={styles.postAuthor}>Author: {post?.userName}</div>
          <div className={styles.postAuthor}>
            Date: {new Date(post?.createdAt).toLocaleDateString()}
          </div>
          <div className={styles.info}>
            <AddLike post={post} />
            <AddDislike post={post} />
          </div>
        </>
      )}

      <div className={styles.commentTitle}>Comments:</div>
      <div className={styles.commentsContainer}></div>
    </div>
  );
};
