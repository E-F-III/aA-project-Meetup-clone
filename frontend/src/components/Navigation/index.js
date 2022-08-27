import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';

import './Navigation.css';

import logo from '../../assets/images/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='flex-row-justify-between flex-row-align-center '>
        <NavLink className='padding-sides' to={'/create-group'}>Create a group</NavLink>
        <ProfileButton className='padding-sides' user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='flex-row'>
        <LoginFormModal />
        <SignUpFormModal />
        {/* <NavLink to="/signup" style={{color:"black", textDecoration:"none"}}>Sign Up</NavLink> */}
      </div>
    );
  }

  return (
    <div className='navigation'>
      <NavLink exact to="/"><img className='logo' src={logo} /></NavLink>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
