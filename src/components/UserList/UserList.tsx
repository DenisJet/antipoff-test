import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.css';

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard />
        </li>
      ))}
    </ul>
  );
}
