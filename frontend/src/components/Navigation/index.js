import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from "../../store/session";

import './Navigation.css';

import logo from '../../assets/images/logo.png'

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = (e) => {
    e.preventDefault();

    const demoUser = { credential: 'demo@user.io', password: 'password' }

    return dispatch(sessionActions.login(demoUser))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <button className='default' onClick={()=>history.push('/create-group')}>Create a group</button>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button className='demo' onClick={demoLogin}>Demo User</button>
        <LoginFormModal />
        <NavLink to="/signup" style={{color:"black", textDecoration:"none"}}>Sign Up</NavLink>
      </>
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
