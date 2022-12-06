import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import { selectUser } from '../utils/selector'
import { fetchOrUpdateUser } from '../features/user'
import { fetchOrUpdateLogin } from '../features/login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import logo from "../assets/argentBankLogo.png";

function Header() {
    const user = useSelector(selectUser)
    const store = useStore()
    //console.log(store)
    const signOut = e => {
        e.preventDefault()
        fetchOrUpdateUser(store)
        fetchOrUpdateLogin(store)
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
                        <Link className="main-nav-item" to="/sign-in"><FontAwesomeIcon icon={faUserCircle} />{`${user.data.body.firstName}`}</Link>
                        <Link className="main-nav-item" to="/" onClick={signOut}><FontAwesomeIcon icon={faSignOut} />Sign Out</Link>
                    </React.StrictMode>
                ) : (
                    <Link className="main-nav-item" to="/sign-in"><FontAwesomeIcon icon={faUserCircle} />Sign In</Link>
                )}
            </div>
        </nav>
    )
}

export default Header