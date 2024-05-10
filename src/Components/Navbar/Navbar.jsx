// import React from "react";

import "./Navbar.css";

import nav_logo from "../../assets/logo.png";
import nav_profile from "../../assets/nav-profile.svg";

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo-container'>
                <div className='logo-left'>
                    <img src={nav_logo} alt='' />
                </div>
                <div className='logo-right'>
                    <p className='main'>Senpai's Stash</p>
                    <p className='secondary'>Admin Panel</p>
                </div>
            </div>
            <img src={nav_profile} alt='' className='nav-profile' />
        </div>
    );
};

export default Navbar;
