import './globals.css';
import ClientNavbar from '../components/ClientNavber';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />

      
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
