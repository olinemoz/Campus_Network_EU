import React from 'react'
import {Link} from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'
import logo from '../../images/logo.png'

const Header = () => {

    return (
        <div className="header bg-light border-0">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">

                <Link to="/" className="logo">
                    <h1 className="navbar-brand text-capitalize p-0 m-0"
                        onClick={() => window.scrollTo({top: 0})}>
                        <img src={logo} alt="" style={{height: '80px', width: '250px'}}/>
                    </h1>
                </Link>

                <Search/>

                <Menu/>
            </nav>
        </div>
    )
}

export default Header
