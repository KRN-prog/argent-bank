import { combineReducers, createStore } from 'redux'
import loginReducer from '../features/login'
import userReducer from '../features/user'
import updateUserNameReducer from '../features/updateName'


const reducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    updateName: updateUserNameReducer
})

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// on utilise le résultat de cette fonction en parametre de createStore
const store = createStore(reducer, reduxDevtools)

export default store