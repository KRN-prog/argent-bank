import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { selectLogin, selectUser } from '../utils/selector'
import { fetchOrUpdateUser } from '../features/user'
import { updateUserName } from '../features/updateName'


function User() {
    const store = useStore()
    const navigate = useHistory()
    const login = useSelector(selectLogin)
    const user = useSelector(selectUser)
    const [names, setChangeNames] = useState(false)
    const [changeName, setChangeName] = useState(false)
    let changeNameState = e => { 
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

    let updateName = e => {
        e.preventDefault()
        updateUserName(store, names, token)
        fetchOrUpdateUser(store, token)
    }
    

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
                            <input type="text" name="firstName" placeholder='First Name' onChange={(e) => setChangeNames({...names, [e.target.name]: e.target.value})}/>
                            <input type="text" name="lastName" placeholder='Last Name' onChange={(e) => setChangeNames({...names, [e.target.name]: e.target.value})}/>

                            <div>
                                <button className="edit-button" onClick={updateName}>Save</button>
                                <button className="edit-button" onClick={changeNameState}>Cancel</button>
                            </div>
                        </form>
                    )
                    }
                </h1>
                {
                changeName === false ? 
                (<button className="edit-button" onClick={changeNameState}>Edit Name</button>)
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