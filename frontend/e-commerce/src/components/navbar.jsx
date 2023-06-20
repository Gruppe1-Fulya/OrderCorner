import {Link} from 'react-router-dom'
import { ShoppingCart, UserCircle } from 'phosphor-react'
import "./navbar.css"
import { MenuItems } from './navbar/MenuItems'
import Dropdown from './navbar/DropDown'
import { useState } from 'react'
import { Button } from './navbar/Button'


export default function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
        setDropdown(false);
        } else {
        setDropdown(false);
        }
    };

    return (
        <>
        <nav className='navbar'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Order Corner
            <i class='fab fa-firstdraft' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/anlcmlysr/profile' className='nav-links' onClick={closeMobileMenu}>
                        <UserCircle size={32} />
                    </Link>
                </li>
                <li
                    className='nav-item'
                >
                    <Link
                    to='/'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    >
                    Shop
                    </Link>
                </li>
                <li
                    className='nav-item'
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <Link
                    to='/categories'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    >
                    Categories <i className='fas fa-caret-down' />
                    </Link>
                    {dropdown && <Dropdown />}
                </li>
                <li className='nav-item'>
                    <Link
                    to='/anlcmlysr/last-checked'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    >
                    Last Checked
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link
                    to='/cart'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    >
                        <ShoppingCart size={28}/>
                    </Link>
                </li>
                <li>
                    <Link
                    to='/login'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                    >
                    Login
                    </Link>
                </li>
            </ul>
            <Button />
        </nav>
        </>
    );
}

/*
<div className="navbar">
            <div className="links">
                <Link to={"/anlcmlysr/profile"}>
                    <UserCircle size={32} />
                </Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/anlcmlysr/last-checked"}>Last Checked</Link>
                <li><a href='/categories'></a>
                    <ul>
                        <li>Men</li>
                    </ul>
                </li>
                <Link to={"/categories"}>Categories
                    <ul className='categories'>
                        {menuItems.map((menu, index) => {
                            return <MenuItems items={menu} key={index} />
                        })}
                    </ul>
                </Link>
                <Link to={"/"}> Shop </Link>
                <Link to={"/cart"}>
                    <ShoppingCart size={32}/>
                </Link>
                <Link to={"/logout"}>Logout</Link>
            </div>
        </div>

*/