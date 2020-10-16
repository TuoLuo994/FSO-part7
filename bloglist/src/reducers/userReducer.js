import storage from '../utils/storage'


const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      user
    })
  }
}

export const initUser = () => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      user: storage.loadUser()
    })
  }
}

export default reducer