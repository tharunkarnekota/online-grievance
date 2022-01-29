import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

            
            <li className="nav-link ">
                <NavLink to="/Dashboard" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                   Dashboard
                </NavLink>
            </li>

            <li className="nav-link ">
                <NavLink to="/myprofile" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    My Profile
                </NavLink>
            </li>

            <li className="nav-link">
                <NavLink to="/contact" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Re-contact
                </NavLink>
            </li>
            
            <li className="nav-link">
                <NavLink to="/login" onClick={()=>localStorage.clear()} style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Logout
                </NavLink>
            </li>

        </nav>
    )
}

export default Header
