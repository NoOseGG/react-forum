import { useForm } from "react-hook-form";

import type { PostRequest } from "../../../entities/post/model/types";
import { useUser } from "../../../entities/user/model/store/user-store";
import { useCreatePost } from "../model/hooks/use-create-post";
import type { FormDataCreatePost } from "../model/types/types";
import styles from "./create-post.module.css";

export const CreatePost = () => {
  const { mutate } = useCreatePost();
  const user = useUser();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormDataCreatePost>({
    mode: "onChange",
  });

  const onSubmit = (obj: FormDataCreatePost) => {
    console.log(obj);

    if (user) {
      const post: PostRequest = {
        title: obj.title,
        body: obj.body,
        userId: user?.id,
        likes: 0,
        dislikes: 0,
        likedId: [],
        dislikedId: [],
        priority: 1,
        userName: user.name,
        favouriteIds: [],
      };

      mutate(post);
    }
  };

  return (
    <div className={styles.createPost}>
      <h2 className={styles.title}>Create post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("title", { required: "Enter title" })}
          type='text'
          placeholder='Enter title...'
          className={styles.input}
        />

        <input
          {...register("body", { required: "Enter text" })}
          type='text'
          placeholder='Enter text...'
          className={styles.input}
        />

        <button
          type='submit'
          className={`${styles.submit} ${!isValid ? styles.disabled : ""}`}
        >
          Create post
        </button>
      </form>
    </div>
  );
};
