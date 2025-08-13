import { useGetPosts } from "../../entities/post/hooks/use-get-posts";
import { PostCard } from "../../entities/post/ui/post-card/post-card";
import styles from "./post-page.module.css";

export const PostPage = () => {
  const { data } = useGetPosts();

  return (
    <div className={styles.postPage}>
      <h2 className={styles.title}>Posts</h2>
      <div className={styles.posts}>
        {data && data?.map(post => <PostCard post={post} />)}
      </div>
    </div>
  );
};
