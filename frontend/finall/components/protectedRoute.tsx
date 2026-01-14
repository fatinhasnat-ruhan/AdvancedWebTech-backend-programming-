'use client';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: any) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      location.href = '/login';
    }
  }, []);

  return children;
}
