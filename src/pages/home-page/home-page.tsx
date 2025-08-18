import { PostCard } from "../../widgets/post-card/post-card";
import { UserCard } from "../../widgets/user-card";
import { useGetPosts } from "./../../entities/post/hooks/use-get-posts";
import { useGetUsers } from "./../../entities/user/model/hooks/use-get-users";
import styles from "./home-page.module.css";

export const HomePage = () => {
  const { data: posts } = useGetPosts();
  const { data: users } = useGetUsers();

  return (
    <div className={styles.homePage}>
      <h2 className={styles.title}>Home</h2>
      {posts && (
        <>
          <h3 className={styles.subtitle}>Last posts</h3>
          <div className={styles.posts}>
            {posts.slice(-3).map(post => (
              <PostCard post={post} />
            ))}
          </div>
        </>
      )}

      {users && (
        <>
          <div className={styles.subtitle}>Last users</div>
          <div className={styles.users}>
            {users.slice(-3).map(user => (
              <UserCard user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
