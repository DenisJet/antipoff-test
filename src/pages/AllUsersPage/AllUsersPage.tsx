import { useNavigate } from 'react-router-dom';
import styles from './AllUsersPage.module.css';
import UserList from '../../components/UserList/UserList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { getUsers, usersActions } from '../../store/users.slice';
import { authActions } from '../../store/auth.slice';

export default function AllUsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, page } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUsers(page.toString()));
  }, [dispatch, page]);

  const logout = () => {
    dispatch(authActions.logout());
    navigate('/register');
  };

  const pageHandler = () => {
    dispatch(usersActions.setPage());
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
        {status === 'loading' && <>Загрузка...</>}
        {status === 'failed' && <>Не удалось загрузить данные...</>}
        {status === 'success' && (
          <>
            <UserList users={users} />
            <button disabled={page >= 2} onClick={pageHandler} className={styles.buttonMore} type='button'>
              Показать ещё
              <img src='/more.svg' alt='' />
            </button>
          </>
        )}
      </main>
    </>
  );
}
