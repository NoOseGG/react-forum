import { useNavigate, useSearch } from "@tanstack/react-router";
import { Divide } from "lucide-react";

import { useEffect } from "react";

import { useGetPosts } from "../../entities/post/hooks/use-get-posts";
import { useGetUserById } from "../../entities/user/model/hooks/use-get-user-by-id";
import { useUser } from "../../entities/user/model/store/user-store";
import { EditProfile } from "../../features/edit-profile";
import { PostCard } from "../../widgets/post-card/post-card";
import styles from "./user-info-page.module.css";

export const UserInfoPage = () => {
  const { id } = useSearch({ strict: false });
  const { data: posts } = useGetPosts();
  const { data: user } = useGetUserById(id);

  const userPosts = posts?.filter(post => post.userId === id);

  return (
    <div className={styles.userInfo}>
      {user?.role === "admin" && (
        <div className={styles.editProfile}>
          <EditProfile />
        </div>
      )}
      <h2 className={styles.title}>User Info</h2>
      <div>
        {user && (
          <div className={styles.info}>
            <div>name: {user?.name}</div>
            <div>email: {user?.email}</div>
            <div>
              created at: {new Date(user?.createdAt).toLocaleDateString()}
            </div>
            <div>address: {user?.address}</div>
            <div>role: {user?.role}</div>
          </div>
        )}
        <h2 className={styles.subtitle}>User posts</h2>

        <div className={styles.posts}>
          {userPosts?.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
