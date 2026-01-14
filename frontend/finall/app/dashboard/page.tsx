'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../lib/axios';

export default function DashboardPage() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('/students/search-fullname?name=a')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {students.length === 0 && <p>No students found</p>}

      {students.map((s) => (
        <p key={s.id}>
          <Link href={`/student/${s.username}`}>
            {s.fullName}
          </Link>
        </p>
      ))}
    </div>
  );
}
