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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordConfirmDirty, setPasswordConfirmDirty] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (nameError || emailError || passwordError || passwordConfirmError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError, passwordConfirmError]);

  const nameHandler = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    if (e.currentTarget.value.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const emailHandler = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    if (!emailValidation(e.currentTarget.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordHandler = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    if (e.currentTarget.value.length < 3) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const passwordConfirmHandler = (e: FormEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.currentTarget.value);
    if (e.currentTarget.value != password) {
      setPasswordConfirmError(true);
    } else {
      setPasswordConfirmError(false);
    }
  };

  const blurHandler = (e: FormEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'passwordConfirm':
        setPasswordConfirmDirty(true);
        break;
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await register({ email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      alert(res.error);
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={submit}>
        <h2>Регистрация</h2>
        <div className={styles.field}>
          <label htmlFor='name'>
            Имя <small className={styles.small}>(от 3х символов)</small>
          </label>
          <input
            className={nameError ? styles.inputError : ''}
            value={name}
            onChange={(e) => nameHandler(e)}
            onBlur={(e) => blurHandler(e)}
            id='name'
            name='name'
            type='text'
            placeholder='Ваше имя'
          />
          {nameDirty && nameError && <small className={styles.error}>Ошибка</small>}
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
            Пароль <small className={styles.small}>(от 3х символов)</small>
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
          <label htmlFor='passwordConfirm'>Подтвердите пароль</label>
          <input
            className={passwordConfirmError ? styles.inputError : ''}
            value={passwordConfirm}
            onChange={(e) => passwordConfirmHandler(e)}
            onBlur={(e) => blurHandler(e)}
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            placeholder='Подтвердите пароль'
          />
          {passwordConfirmDirty && passwordConfirmError && <small className={styles.error}>Ошибка</small>}
        </div>
        <button disabled={!formValid} className={styles.button} type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}
