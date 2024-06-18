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
              <main className={styles.main}>
                <div className={styles.contacts}>
                  <Link className={styles.contactLink} to='tel:+79543334455'>
                    <img src='/phone.svg' alt='телефон' />
                    +7 (954) 333-44-55
                  </Link>
                  <Link className={styles.contactLink} to={'mailto:' + data.email}>
                    <img src='/email.svg' alt='почта' />
                    {data.email}
                  </Link>
                </div>
                <div className={styles.mainTextContainer}>
                  <p>
                    Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов,
                    включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он
                    помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения
                    новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
                  </p>
                  <p>
                    В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с
                    трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов —
                    это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности,
                    уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше
                    развиваться самостоятельно".
                  </p>
                  <p>
                    Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
                    предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в
                    Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
                  </p>
                </div>
              </main>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
