'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ProtectedRoute from '../../components/protectedRoute';

export default function DashboardPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

const loadStudents = async () => {
  try {
    const res = await axios.get('http://localhost:3000/students', {
      withCredentials: true, // 🔥 cookie পাঠানোর জন্য
    });

    setStudents(res.data);
    setLoading(false);
  } catch (err) {
    setLoading(false);
  }
};


  useEffect(() => {
    loadStudents();
  }, []);

  // ================= REMOVE COURSE =================
  const removeCourse = async (courseId: string) => {
    if (!confirm('Remove this course?')) return;

    try {
      await axios.delete(
        `http://localhost:3000/students/course/${courseId}`,
        { withCredentials: true }
      );

      await loadStudents();
    } catch {
      alert('Failed to remove course');
    }
  };

  return (
    <ProtectedRoute>
      <div>
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px',
          }}
        >
          <div>
            <h2>Dashboard</h2>
            <p style={{ color: '#666' }}>
              Overview of all registered students and courses
            </p>
          </div>
        </div>

        {loading && <p>Loading students...</p>}
        {!loading && students.length === 0 && <p>No students found</p>}

        {/* GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {students.map((s) => (
            <div key={s.id} className="card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <h3>{s.fullName}</h3>
                <span
                  style={{
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: s.isActive ? '#dcfce7' : '#fee2e2',
                    color: s.isActive ? '#166534' : '#991b1b',
                  }}
                >
                  {s.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p><b>Username:</b> {s.username}</p>

              {/* PROFILE */}
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <p><b>Address:</b> {s.profile?.address || 'N/A'}</p>
                <p><b>Phone:</b> {s.profile?.phoneNumber || 'N/A'}</p>
              </div>

              {/* COURSES */}
              <p style={{ marginTop: '10px' }}><b>Courses</b></p>

              {s.courses?.length ? (
                <ul style={{ paddingLeft: '16px', fontSize: '14px' }}>
                  {s.courses.map((c: any) => (
                    <li
                      key={c.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}
                    >
                      <span>
                        {c.courseName} ({c.courseCode})
                      </span>

                      <button
                        onClick={() => removeCourse(c.id)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '2px 8px',
                          fontSize: '12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '14px', color: '#777' }}>
                  No courses enrolled
                </p>
              )}

              <Link href={`/student/${s.username}`}>
                <button style={{ marginTop: '12px', width: '100%' }}>
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
