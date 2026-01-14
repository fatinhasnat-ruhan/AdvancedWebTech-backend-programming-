'use client';

import Link from 'next/link';

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem('token');
    location.href = '/login';
  };

  return (
    <nav>
      <Link href="/">Home</Link> |{' '}
      <Link href="/dashboard">Dashboard</Link> |{' '}
      <Link href="/login">Login</Link> |{' '}
      <Link href="/register">Register</Link> |{' '}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
