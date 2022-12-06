import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { selectLogin, selectUser } from '../utils/selector'
import { fetchOrUpdateUser } from '../features/user'


function User() {
    const store = useStore()
    const navigate = useHistory()
    const login = useSelector(selectLogin)
    const user = useSelector(selectUser)
    const [changeName, setChangeName] = useState(false)
    let reverseName = e => { 
        e.preventDefault()
        setChangeName( !changeName )
    }
    let token
    //console.log(login)
    if (login.data !== null) {
        token = login.data.body.token
    }else{
        navigate.push("/")
    }
    //console.log(token)

    useEffect(() => {
        fetchOrUpdateUser(store, token)
    }, [store, token])
    //console.log(user)
    

    return(user.status === "resolved" ? (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br/>
                    {
                    changeName === false ? 
                    `${user.data.body.firstName} ${user.data.body.lastName} !` 
                    : 
                    (
                        <form>
                            <input type="text" name="firstName" placeholder='First Name'/>
                            <input type="text" name="lastName" placeholder='Last Name'/>

                            <div>
                                <button className="edit-button">Save</button>
                                <button className="edit-button" onClick={reverseName}>Cancel</button>
                            </div>
                        </form>
                    )
                    }
                </h1>
                {
                changeName === false ? 
                (<button className="edit-button" onClick={reverseName}>Edit Name</button>)
                : 
                null
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
        ): null
    )
}

export default User