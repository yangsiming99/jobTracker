import React, { ReactNode } from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';
import Sidebar from '../components/sidebar/sidebar';
import './layout.css'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({children} : LayoutProps) => {
  
  return(
  <div className='mainContent'>
    <div className='mainView'>
      <Sidebar />
      <div className='contentView'>{children}</div>
    </div>
  </div>
  );
}

export default Layout;