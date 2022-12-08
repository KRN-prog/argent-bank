import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux'
import { useHistory } from "react-router-dom";
import { selectLogin, selectUser } from '../utils/selector'
import { fetchOrUpdateUser } from '../features/user'
import { updateUserName } from '../features/updateName'


function Transactions() {
    const store = useStore()
    const navigate = useHistory()
    const login = useSelector(selectLogin)
    const user = useSelector(selectUser)
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
            <div className="header header--transactions">
                <span>Argent Bank Checking (x8349)</span>
                <h1>$2,082.79</h1>
                <span>Available balance</span>
            </div>
            <table className='tableBalance'>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                        <th>BALANCE</th>
                    </tr>
                </thead>
                <tbody className='tableBodyBalance'>
                    <tr>
                        
                        <td className='tableDateCell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td className='tableDescriptionCell'>Golden Sun Bakery</td>
                        <td className='tableAmountCell'>$5</td>
                        <td className='tableBalanceCell'>$2,082.79</td>
                    </tr>

                    <tr>
                        
                        <td className='tableDateCell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td className='tableDescriptionCell'>Golden Sun Bakery</td>
                        <td className='tableAmountCell'>$5</td>
                        <td className='tableBalanceCell'>$2,082.79</td>
                    </tr>

                    <tr>
                        
                        <td className='tableDateCell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td className='tableDescriptionCell'>Golden Sun Bakery</td>
                        <td className='tableAmountCell'>$5</td>
                        <td className='tableBalanceCell'>$2,082.79</td>
                    </tr>

                    <tr>
                        
                        <td className='tableDateCell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td className='tableDescriptionCell'>Golden Sun Bakery</td>
                        <td className='tableAmountCell'>$5</td>
                        <td className='tableBalanceCell'>$2,082.79</td>
                    </tr>

                    <tr>
                        <td className='tableDateCell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td className='tableDescriptionCell'>Golden Sun Bakery</td>
                        <td className='tableAmountCell'>$5</td>
                        <td className='tableBalanceCell'>$2,082.79</td>
                    </tr>

                    <tr className='DropDown'>
                        <td className='DropDown__cell'><span className='arrow'>v</span> <span className='contentDate'>June 20th, 2020</span></td>
                        <td>Golden Sun Bakery</td>
                        <td>$5</td>
                        <td>$2,082.79</td>
                    </tr>
                    <tr>
                        <td className='dropDownContent'>
                            <div>Transaction type: Electronic</div>
                            <div>Category: Food</div>
                            <div>Notes:</div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </main>
        ): null
    )
}

export default Transactions