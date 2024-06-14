import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './UserPage.module.css';
import { UserCardProps } from '../../components/UserCard/UserCard';
import { Suspense } from 'react';

export default function UserPage() {
  const data = useLoaderData() as { data: UserCardProps };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/register');
  };

  return (
    <>
      <Suspense fallback={'Загрузка...'}>
        <Await resolve={data.data}>
          {({ data }: { data: UserCardProps }) => (
            <>
              <header className={styles.header}>
                <div className={styles.headerContainer}>
                  <button className={styles.logoutButtonMobile} type='button' onClick={logout}>
                    <img src='/logout.svg' alt='иконка выхода' />
                  </button>
                  <button className={styles.logoutButton} type='button' onClick={logout}>
                    Выход
                  </button>
                  <Link to='/' className={styles.backButtonMobile}>
                    <img src='/back.svg' alt='назад' />
                  </Link>
                  <Link to='/' className={styles.backButton}>
                    Назад
                  </Link>
                  <div>
                    <h1 className={styles.headerTitle}>{data.first_name + ' ' + data.last_name}</h1>
                    <p className={styles.headerText}>Партнёр</p>
                  </div>
                  <img className={styles.avatar} src={data.avatar} alt='аватар' />
                </div>
              </header>
              <main></main>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
