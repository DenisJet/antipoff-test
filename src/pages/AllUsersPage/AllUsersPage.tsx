import { useNavigate } from 'react-router-dom';
import styles from './AllUsersPage.module.css';
import UserList from '../../components/UserList/UserList';
import { useEffect, useState } from 'react';
import { getUsersData } from '../../helpers/API';

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await getUsersData(page.toString());
        setUsers(users.concat(data));
      } catch (error) {
        setError('Не удалось загрузить данные...');
      } finally {
        setIsLoading(false);
      }
    };
    console.log(page);
    getUsers();
  }, [page]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  const pageHandler = () => {
    setPage(page + 1);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <button className={styles.logoutButtonMobile} type='button' onClick={logout}>
            <img src='/logout.svg' alt='иконка выхода' />
          </button>
          <button className={styles.logoutButton} type='button' onClick={logout}>
            Выход
          </button>
          <h1 className={styles.headerTitle}>Наша команда</h1>
          <p className={styles.headerText}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие
            находить выход из любых, даже самых сложных ситуаций.{' '}
          </p>
        </div>
      </header>
      <main className={styles.main}>
        {error && <>{error}</>}
        {!isLoading && !error && (
          <>
            <UserList users={users} />
            <button disabled={page >= 2} onClick={pageHandler} className={styles.buttonMore} type='button'>
              Показать ещё
              <img src='/more.svg' alt='' />
            </button>
          </>
        )}
        {isLoading && <>Загрузка...</>}
      </main>
    </>
  );
}
