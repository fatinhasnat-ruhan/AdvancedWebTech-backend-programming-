import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <h1>
          Online Learning <span>Management System</span>
        </h1>

        <p>
          A modern platform to manage students, courses, and learning progress
          with ease. Built using Next.js and NestJS.
        </p>

        <div className="home-actions">
          <a href="/login" className="btn-primary">
            Login
          </a>
          <a href="/register" className="btn-outline">
            Register
          </a>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3>Student Management</h3>
          <p>Create, update, and manage student profiles efficiently.</p>
        </div>

        <div className="feature-card">
          <h3>Course Enrollment</h3>
          <p>Enroll students in courses and track learning progress.</p>
        </div>

        <div className="feature-card">
          <h3>Secure </h3>
          <p> ensures secure access.</p>
        </div>
      </div>
    </div>
  );
}
