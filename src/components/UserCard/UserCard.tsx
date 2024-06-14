import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

export interface UserCardProps {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function UserCard(user: UserCardProps) {
  return (
    <Link to={`/users/${user.id}`} className={styles.card}>
      <img src={user.avatar} alt={user.first_name + ' ' + user.last_name} className={styles.avatar} />
      <p className={styles.name}>{user.first_name + ' ' + user.last_name}</p>
      <button className={styles.button} type='button'>
        <img src='/like.svg' alt='иконка лайка' />
      </button>
    </Link>
  );
}
