import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import './Nav.css'
import Logo from '../assets/images/Logo.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  console.log("This is the state: ",user);
  // Check if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  return(
    <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
      <Link to="/">
        <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} />
      </Link>
      <Stack
      
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end"
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #FF2625' }}>Home</Link>
        <a href="#exercises" style={{ textDecoration: 'none', color: '#3A1212' }}>Exercises</a>
        <Link to="/Subsplan" style={{ textDecoration: 'none', color: '#3A1212'}}>MemberShip</Link>
        <Link to="/services" style={{ textDecoration: 'none', color: '#3A1212'}}>Services</Link>
        <Link to="/contacts" style={{ textDecoration: 'none', color: '#3A1212'}}>Contact</Link>
      </Stack>
      {/* Conditionally render the login button */}
      {!isLoginPage && (
        <Link to="/login" className='btn' style={{position:'absolute'}}>
          Login
        </Link>
      )}
    </Stack>
  )
};

export default Navbar;
