import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import './FooterInfo.css'

function FooterInfo() {
    const sessionUser = useSelector(state => state.session.user);

    return  (
        <div className='footer-info-main'>
            <div className='footer-content'>
                <p>
                    Hike Up is a clone of the platform Meetup. Meetup is a platform for finding and building local communities. People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together.
                </p>
            </div>
            <div className='footer-lists'>
                <ul className='footer-list'>
                    <li className='list-header'>
                        Your Account
                    </li>
                    { !sessionUser && <li> <NavLink className='footerNavLink' to='/signup'> Sign Up </NavLink></li> }
                    { sessionUser && <li> <NavLink className='footerNavLink' to='/your-groups'> Your groups </NavLink></li> }
                </ul>
                <ul className='footer-list'>
                    <li className='list-header'>
                        Discover
                    </li>
                    <li> <NavLink className='footerNavLink' to='/'> Home </NavLink></li>
                    <li> <NavLink className='footerNavLink' to='/groups'> Groups </NavLink></li>
                    <li> <NavLink className='footerNavLink' to='/events'> Events </NavLink></li>
                </ul>
                <ul className='footer-list'>
                    <li className='list-header'>
                        About the Dev
                    </li>
                    <li> <a className='footerNavLink' href='https://www.linkedin.com/in/efiii/'> LinkedIn </a></li>
                    <li> <a className='footerNavLink' href='https://github.com/E-F-III'> GitHub </a></li>
                    <li> <a className='footerNavLink' href='https://www.instagram.com/edwardfelipeiii/'> Instagram </a></li>
                </ul>
            </div>
        </div>

    )
}

export default FooterInfo
