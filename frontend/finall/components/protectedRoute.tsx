'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:3000/auth/me', {
          withCredentials: true, // 🔥 cookie পাঠাবে
        });

        setOk(true);
      } catch {
        location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return ok ? children : null;
}
