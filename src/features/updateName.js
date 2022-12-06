import produce from 'immer'
import { selectUpdateName } from '../utils/selector'

const initialState = {
  status: 'void',
  data: null,
  error: null
}

const FETCHING = 'updateName/fetching'
const SUBMIT = 'updateName/submit'
const REJECTED = 'updateName/rejected'

const changeNameFetching = () => ({ type: FETCHING })
const chanegNameSubmit = (data) => ({ type: SUBMIT, payload: data })
const changeNameRejected = (error) => ({ type: REJECTED, payload: error })


export async function updateUserName(store, formData, userToken) {
  const status = selectUpdateName(store.getState()).status

  if (status === 'pending' || status === 'updating') {
    return
  }

  store.dispatch(changeNameFetching())
  if (formData !== undefined && userToken !== undefined) {
    if (formData.firstName !== undefined || formData.lastName !== undefined) {
      try{
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${userToken}`
          }),
          body: new URLSearchParams({
            'firstName': formData.firstName,
            'lastName': formData.lastName,
          })
        })
        const data = await response.json()
        if (data.status === 200) {
          store.dispatch(chanegNameSubmit(data))
          console.log(data)
        }else{
          store.dispatch(changeNameRejected("Utilisateur non trouvé."))
        }
      }catch (error){
        store.dispatch(changeNameRejected(error))
      }   
    }else{
      store.dispatch(changeNameRejected("Veuillez remplire tout les champs s'il vous plait."))
    } 
  }else{
    store.dispatch(changeNameRejected(""))
  }
}

export default function updateUserNameReducer(state = initialState, action) {
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