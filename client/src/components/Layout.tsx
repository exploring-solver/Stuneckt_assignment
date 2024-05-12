import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import "../app/globals.css";
import Footer from './Footer';
interface LayoutProps {
    children: ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/');
  };

  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
