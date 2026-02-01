'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function StudentPage() {
  const params = useParams();
  const username = params.username as string;

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const loadStudent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/students/username/${username}`,
        {
          withCredentials: true, 
        }
      );

      setStudent(res.data);
      setAddress(res.data.profile?.address || '');
      setPhoneNumber(res.data.profile?.phoneNumber || '');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) loadStudent();
  }, [username]);

  const addCourse = async () => {
    if (!courseName || !courseCode) {
      alert('Fill all fields');
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/students/course/add/${student.id}`,
        { courseName, courseCode },
        { withCredentials: true }
      );

      setCourseName('');
      setCourseCode('');
      loadStudent();
    } catch {
      alert('Failed to add course');
    }
  };

  const removeCourse = async (courseId: string) => {
    if (!confirm('Remove this course?')) return;

    try {
      await axios.delete(
        `http://localhost:3000/students/course/${courseId}`,
        { withCredentials: true }
      );
      loadStudent();
    } catch {
      alert('Failed to remove course');
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `http://localhost:3000/students/profile/update/${student.id}`,
        { address, phoneNumber },
        { withCredentials: true }
      );

      loadStudent();
      alert('Profile updated successfully');
    } catch {
      alert('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
      {/* LEFT */}
      <div className="card">
        <h3>Student Info</h3>
        <p><b>Name:</b> {student.fullName}</p>
        <p><b>Username:</b> {student.username}</p>
        <p><b>Status:</b> {student.isActive ? 'Active' : 'Inactive'}</p>

        <h4 style={{ marginTop: '15px' }}>Update Profile</h4>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={updateProfile}>Update Profile</button>
      </div>

      {/* RIGHT */}
      <div className="card">
        <h3>Add Course</h3>
        <input
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <button onClick={addCourse}>Add Course</button>

        <h3 style={{ marginTop: '20px' }}>Enrolled Courses</h3>

        {student.courses?.length ? (
          <ul>
            {student.courses.map((c: any) => (
              <li
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
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
                    padding: '3px 10px',
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
          <p>No courses enrolled</p>
        )}
      </div>
    </div>
  );
}
