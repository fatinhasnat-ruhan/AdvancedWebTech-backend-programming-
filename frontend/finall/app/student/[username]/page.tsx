import axios from 'axios';

interface StudentPageProps {
  params: {
    username: string;
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const res = await axios.get(
    `http://localhost:3000/students/username/${params.username}`
  );

  const s = res.data;

  return (
    <>
      <h2>{s.fullName}</h2>
      <p>Address: {s.profile.address}</p>
      <p>Phone: {s.profile.phoneNumber}</p>
    </>
  );
}
