import { X } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useSetUser } from "../../../../entities/user/model/store/user-store";
import { useLogin } from "../../model/hooks/useLogin";
import type { FormData } from "../../model/types/types";
import styles from "./login-overlay.module.css";

interface Props {
  onClose: () => void;
}

export const LoginOverlay: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const setUser = useSetUser();
  const { data: user } = useLogin(email, password);

  useEffect(() => {
    if (user) {
      setUser(user);
      onClose();
    }
  }, [user]);

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
    setPassword(data.password);
  };

  console.log(user);

  return (
    <div className={styles.loginOverlay}>
      <X
        className={styles.closeButton}
        color='#a09dad'
        size={40}
        onClick={onClose}
      />
      <h2 className={styles.title}>Authorization</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("email", { required: "Enter email" })}
          className={styles.input}
          type='email'
          placeholder='enter email'
        />
        {/* {errors.email && <p>{errors.email.message}</p>} */}

        <input
          {...register("password", { required: "Enter password" })}
          className={styles.input}
          type='password'
          placeholder='enter password'
        />
        {/* {errors.password && <p>{errors.password.message}</p>} */}

        <button
          type='submit'
          disabled={!isValid}
          className={`${styles.submit} ${!isValid ? styles.disabled : ""}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};
