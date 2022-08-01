import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push('/')
  };

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        {user.firstName[0] + user.lastName[0]}
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <ul className="profile-dropdown">
            <li className="profile-dropdown" >
              <NavLink className='profile-groups' to={'/your-groups'}>Your groups</NavLink>
            </li>
            <li className="profile-dropdown" >{user.firstName} {user.lastName}</li>
            <li className="profile-dropdown" >{user.email}</li>
            <li className="profile-dropdown" >
              <button  className="no-style" onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
