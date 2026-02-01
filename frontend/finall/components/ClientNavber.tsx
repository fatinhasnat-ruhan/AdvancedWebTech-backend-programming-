'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ClientNavbar() {
  const pathname = usePathname();

  // pages where navbar should be hidden
  const hideNavbar =
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  if (hideNavbar) return null;

  return <Navbar />;
}
