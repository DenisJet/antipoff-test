import { FormEvent, useEffect, useState } from 'react';
import styles from './RegisterPage.module.css';
//import { register } from '../../helpers/API';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../helpers/formValidation';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { register } from '../../store/auth.slice';

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

  const [passwordType, setPasswordType] = useState('password');
  const [passwordConfirmType, setPasswordConfirmType] = useState('password');

  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  //const token = localStorage.getItem('token');

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
      if (e.currentTarget.value === passwordConfirm) {
        setPasswordConfirmError(false);
      } else {
        setPasswordConfirmError(true);
      }
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

  const passwordTypeChange = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const passwordConfirmTypeChange = () => {
    if (passwordConfirmType === 'password') {
      setPasswordConfirmType('text');
    } else {
      setPasswordConfirmType('password');
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(register({ email, password }));
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
            type={passwordType}
            placeholder='Введите пароль'
          />
          <span className={styles.hide} onClick={passwordTypeChange}>
            <img src='/hide.svg' alt='показать' width={24} height={24} />
          </span>
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
            type={passwordConfirmType}
            placeholder='Подтвердите пароль'
          />
          <span className={styles.hide} onClick={passwordConfirmTypeChange}>
            <img src='/hide.svg' alt='показать' width={24} height={24} />
          </span>
          {passwordConfirmDirty && passwordConfirmError && <small className={styles.error}>Ошибка</small>}
        </div>
        <button disabled={!formValid} className={styles.button} type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}
