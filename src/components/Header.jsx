import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../utils/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/argentBankLogo.png";

function Header() {
    const user = useSelector(selectUser)
    console.log(user)
    const signOut = e => {
        e.preventDefault()
    }
    return(
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user.status === "resolved" && user.data !== null ? (
                    <React.StrictMode>
                        <Link className="main-nav-item" to="/sign-in"><FontAwesomeIcon icon={faUserCircle} />Sign In</Link>
                        <Link className="main-nav-item" onClick={signOut}><FontAwesomeIcon icon={faUserCircle} />Sign Out</Link>
                    </React.StrictMode>
                ) : (
                    <Link className="main-nav-item" to="/sign-in"><FontAwesomeIcon icon={faUserCircle} />Sign In</Link>
                )}
            </div>
        </nav>
    )
}

export default Header