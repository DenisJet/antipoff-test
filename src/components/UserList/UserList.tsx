import UserCard, { UserCardProps } from '../UserCard/UserCard';
import styles from './UserList.module.css';

interface UserListProps {
  users: UserCardProps[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard
            id={user.id}
            email={user.email}
            first_name={user.first_name}
            last_name={user.last_name}
            avatar={user.avatar}
          />
        </li>
      ))}
    </ul>
  );
}
