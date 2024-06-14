import { FormEvent, useEffect, useState } from 'react';
import styles from './RegisterPage.module.css';
import { register } from '../../helpers/API';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../helpers/formValidation';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (!emailValidation(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password } = target;

    if (emailValidation(email.value)) {
      setEmailError(false);

      const res = await register({ email: email.value, password: password.value });
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/');
      }
    } else {
      console.log(emailError);
      setEmailError(true);
      return;
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
          <input
            className={emailError ? styles.inputError : ''}
            value={email}
            onChange={(e) => emailHandler(e)}
            onBlur={(e) => blurHandler(e)}
            id='email'
            name='email'
            type='email'
            placeholder='example@mail.ru'
          />
          {emailDirty && emailError && <small className={styles.error}>Ошибка</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor='password'>
            Пароль <small className={styles.passwordSmall}>(более 3х символов)</small>
          </label>
          <input
            className={passwordError ? styles.inputError : ''}
            value={password}
            onChange={(e) => passwordHandler(e)}
            onBlur={(e) => blurHandler(e)}
            id='password'
            name='password'
            type='password'
            placeholder='Введите пароль'
          />
          {passwordDirty && passwordError && <small className={styles.error}>Ошибка</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor='confirm'>Подтвердите пароль</label>
          <input id='confirm' name='confirm' type='text' placeholder='Подтвердите пароль' />
        </div>
        <button disabled={!formValid} className={styles.button} type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}
