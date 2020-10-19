import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser, initUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import getAll from './services/users'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import loginService from './services/login'
import storage from './utils/storage'

import {
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const get = async () => {
      const u = await getAll()
      setUsers(u)
    }
    get()
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])


  const user = useSelector(state => state.user)

  const notifyWith = (message,) => {
    setNotification(message, 5)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const newBlog = async (blog) => {
    try {
      createBlog(blog)
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label='username'
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label='password'
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            type='submit'>
            login
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Container>
      <Router>
        <AppBar>
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Toolbar>
        </AppBar>
        <h2>blogs</h2>
        <div>
          <span>
            {user.name} logged in
          </span>
          <button onClick={handleLogout}>
            logout
          </button>
          <Notification />
        </div>
        <Switch>
          <Route path="/users/:id">
            <UserView users = {users} />
          </Route>
          <Route path="/users">
            <UserList users = {users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogView />
          </Route>
          <Route path='/'>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog newBlog={newBlog} />
            </Togglable>
            <BlogList user={ user } />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App
