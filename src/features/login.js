import produce from 'immer'
import { useHistory } from "react-router-dom";
import { selectLogin } from '../utils/selector'

const initialState = {
  status: 'void',
  data: null,
  error: null
}

const FETCHING = 'login/fetching'
const SUBMIT = 'login/submit'
const REJECTED = 'login/rejected'

const loginFetching = () => ({ type: FETCHING })
const loginSubmit = (data) => ({ type: SUBMIT, payload: data })
const loginRejected = (error) => ({ type: REJECTED, payload: error })


export async function fetchOrUpdateLogin(store, formData) {
  const status = selectLogin(store.getState()).status

  if (status === 'pending' || status === 'updating') {
    return
  }

  store.dispatch(loginFetching())
  if (formData.username !== undefined || formData.password !== undefined) {
    try{
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: new URLSearchParams({
          'email': formData.username,
          'password': formData.password,
        })
      })
      const data = await response.json()
      console.log(data)
      if (data.status === 200) {
        store.dispatch(loginSubmit(data))
        document.location.href="/user?token="+data.body.token;
      }else{
        store.dispatch(loginRejected("Utilisateur non trouvé."))
      }
    }catch (error){
      store.dispatch(loginRejected(error))
    }   
  }else{
    store.dispatch(loginRejected("Veuillez remplire tout les champs s'il vous plait."))
  }
}

export default function loginReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
        if (draft.status === 'void') {
          draft.status = 'pending'
          return
        }
        if (draft.status === 'rejected') {
          draft.error = null
          draft.status = 'pending'
          return
        }
        if (draft.status === 'resolved') {
          draft.status = 'updating'
          return
        }
        return
      }
      case SUBMIT: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }
      case REJECTED: {
        console.log("eeeeeeeeeee")
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
          return
        }
        return
      }
      default:
        return
    }
  })
}