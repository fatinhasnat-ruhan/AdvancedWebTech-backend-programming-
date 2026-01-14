'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validators/auth.schema';
import { api } from '../lib/axios';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await api.post('/auth/login', data);
    localStorage.setItem('token', res.data.accessToken);
    alert('Login successful');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <input {...register('username')} placeholder="Username" />
      {errors.username && <p>{errors.username.message as string}</p>}

      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <p>{errors.password.message as string}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
