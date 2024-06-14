import styles from './AllUsersPage.module.css';

export default function AllUsersPage() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <button className={styles.logoutButtonMobile} type='button'>
            <img src='/logout.svg' alt='иконка выхода' />
          </button>
          <button className={styles.logoutButton} type='button'>
            Закрыть
          </button>
          <h1 className={styles.headerTitle}>Наша команда</h1>
          <p className={styles.headerText}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие
            находить выход из любых, даже самых сложных ситуаций.{' '}
          </p>
        </div>
      </header>
      <main>AllUsersPage</main>
    </>
  );
}
