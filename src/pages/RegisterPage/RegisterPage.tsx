import { FormEvent } from 'react';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function RegisterPage() {
  const submit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return <></>;
}
