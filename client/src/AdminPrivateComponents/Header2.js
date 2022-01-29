import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

            
            <li className="nav-link ">
                <NavLink to="/Admindashboard" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                   Dashboard
                </NavLink>
            </li>

            <li className="nav-link ">
                <NavLink to="/adminprofile" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    My Profile
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
