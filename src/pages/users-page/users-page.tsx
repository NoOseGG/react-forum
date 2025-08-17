import { ClipLoader } from "react-spinners";
import { useGetUsers } from "../../entities/user/model/hooks/use-get-users";
import { UserCard } from "../../widgets/user-card";
import styles from "./users-page.module.css";

export const UsersPage = () => {
  const { data, isFetching } = useGetUsers();

  return (
    <div className={styles.userPage}>
      <h2 className={styles.title}>Users</h2>
      <div className={styles.users}>
        {data && data.map(user => <UserCard user={user} key={user.id} />)}
      </div>
      {isFetching && !data && (
        <div className={styles.spinner}>
          <ClipLoader color='#fff' size={150} />
        </div>
      )}
    </div>
  );
};
