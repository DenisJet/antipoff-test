import { FormEvent, useEffect } from 'react';
import styles from './RegisterPage.module.css';
import { register } from '../../helpers/API';
import { useNavigate } from 'react-router-dom';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function RegisterPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password } = target;
    const res = await register({ email: email.value, password: password.value });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={submit}>
        <h2>Регистрация</h2>
        <div className={styles.field}>
          <label htmlFor='name'>Имя</label>
          <input id='name' name='name' type='text' placeholder='Ваше имя' />
        </div>
        <div className={styles.field}>
          <label htmlFor='email'>Электронная почта</label>
          <input id='email' name='email' type='text' placeholder='example@mail.ru' />
        </div>
        <div className={styles.field}>
          <label htmlFor='password'>Пароль</label>
          <input id='password' name='password' type='text' placeholder='Введите пароль' />
        </div>
        <div className={styles.field}>
          <label htmlFor='confirm'>Подтвердите пароль</label>
          <input id='confirm' name='confirm' type='text' placeholder='Подтвердите пароль' />
        </div>
        <button className={styles.button}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
