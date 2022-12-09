import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { selectLogin } from '../utils/selector'
import { fetchOrUpdateLogin } from '../features/login'

function SignIn() {
    const store = useStore()
    const navigate = useHistory()
    const [values, setValues] = useState({})

    const login = useSelector(selectLogin)
    useEffect(() => {
        {login.status === "resolved" ? navigate.push("/user") : (<div></div>)}
    })
    const submit = e => {
        e.preventDefault()
        fetchOrUpdateLogin(store, values)
    }
    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                {login.status === "rejected" && login.error !== null ? login.error : null}
                <form encType="application/x-www-form-urlencoded" onSubmit={submit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label><input type="text" name="username" id="username" onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label><input type="password" name="password" id="password" onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
}

export default SignIn