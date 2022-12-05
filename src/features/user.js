import produce from 'immer'
import { selectUser } from '../utils/selector'

const initialState = {
  status: 'void',
  data: null,
  error: null
}

const FETCHING = 'user/fetching'
const RESOLVED = 'user/resolved'
const REJECTED = 'user/rejected'
const SIGNOUT = 'user/signOut'

const userFetching = () => ({ type: FETCHING })
const userResolved = (data) => ({ type: RESOLVED, payload: data })
const userRejected = (error) => ({ type: REJECTED, payload: error })
const userSignOut = () => ({ type: SIGNOUT })


export async function fetchOrUpdateUser(store, userToken) {
    const status = selectUser(store.getState()).status

    if (status === 'pending' || status === 'updating') {
      return
    }

    store.dispatch(userFetching())
    try{
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'post',
        headers: new Headers({
          "Authorization": `Bearer ${userToken}`
        })
      })
      const data = await response.json()
      console.log(data)
      store.dispatch(userResolved(data))
    }catch (error){
      store.dispatch(userRejected(error))
    }
}

export default function userReducer(state = initialState, action) {
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
      case RESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }
      case REJECTED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
          return
        }
        return
      }
      case SIGNOUT: {
        return
      }
      default:
        return
    }
  })
}