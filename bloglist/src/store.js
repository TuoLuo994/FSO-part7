import { createStore, combineReducers,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))