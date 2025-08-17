import { use } from "react";
import { useForm } from "react-hook-form";

import { useEditUser } from "../../entities/user/model/hooks/use-edit-user";
import { useUser } from "../../entities/user/model/store/user-store";
import type { User } from "../../entities/user/model/types/types";
import styles from "./user-account-page.module.css";

interface FormValues {
  name: string;
  email: string;
  address: string;
}

export const UserAccountPage = () => {
  const user = useUser();
  const { mutate } = useEditUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);

    if (user) {
      const updatedUser: User = {
        ...user,
        name: data.name,
        email: data.email,
        address: data.address,
      };

      mutate(updatedUser);
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset({
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
    });
  };

  return (
    <div className={styles.userAccount}>
      <h2 className={styles.title}>Personal account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor='name'>
            Name
          </label>
          <input
            {...register("name", { required: "Enter name" })}
            type='text'
            className={styles.input}
            defaultValue={user?.name}
            placeholder='Enter name'
            name='name'
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            {...register("email", { required: "Enter email" })}
            type='email'
            className={styles.input}
            defaultValue={user?.email}
            placeholder='Enter email'
            name='email'
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor='address'>
            Address
          </label>
          <input
            {...register("address", { required: "Enter address" })}
            type='text'
            className={styles.input}
            defaultValue={user?.address}
            placeholder='Enter address'
            name='address'
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            type='submit'
            className={`${styles.btnSubmit} ${!isValid ? styles.disabled : ""}`}
          >
            Save
          </button>
          <button type='button' className={styles.btnCancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
