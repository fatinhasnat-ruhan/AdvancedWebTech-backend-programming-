import './globals.css';
import type { ReactNode } from 'react';
import ClientNavbar from '../components/ClientNavber';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
