import { useSearch } from "@tanstack/react-router";

import { useGetComments } from "../../entities/comment/model/hooks/use-get-comments";
import { useGetPostById } from "../../entities/post/hooks/use-get-post-by-id";
import { useUser } from "../../entities/user/model/store/user-store";
import { AddComment } from "../../features/add-comment";
import { AddDislike } from "../../features/add-dislike";
import { AddFavourite } from "../../features/add-favourite";
import { AddLike } from "../../features/add-like";
import { DeletePostBtn } from "../../features/delete-post-btn";
import { CommentCard } from "../../widgets/comment-card";
import styles from "./post-info-page.module.css";

export const PostInfoPage = () => {
  const { id } = useSearch({ strict: false });
  const { data: post } = useGetPostById(id);
  const user = useUser();
  const { data: comments } = useGetComments();

  const sortedComments = comments?.filter(item => item.postId === post?.id);

  return (
    <div className={styles.postInfoPage}>
      <div className={styles.editBtn}>
        {post && user && <AddFavourite post={post} />}
        {post?.id && user?.role === "admin" ? (
          <DeletePostBtn postId={post.id} />
        ) : (
          post?.id &&
          user?.id === post?.userId && <DeletePostBtn postId={post.id} />
        )}
      </div>
      <h2 className={styles.title}>Post Info</h2>
      {post && (
        <>
          <div className={styles.postTitle}>{post?.title}</div>
          <div className={styles.postText}>{post?.body}</div>

          <div className={styles.postAuthor}>Author: {post?.userName}</div>
          <div className={styles.postDate}>
            Date: {new Date(post?.createdAt).toLocaleDateString()}
          </div>
          <div className={styles.info}>
            <AddLike post={post} />
            <AddDislike post={post} />
          </div>
        </>
      )}

      <div className={styles.commentTitle}>
        Comments: {sortedComments?.length}
      </div>
      <div className={styles.commentsContainer}>
        {sortedComments &&
          sortedComments.map(comment => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
      </div>
      {post && (
        <div className={styles.addComment}>
          <AddComment post={post} />
        </div>
      )}
    </div>
  );
};
