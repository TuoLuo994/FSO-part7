import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

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
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const newBlog = async (blog) => {
    try {
      // const newBlog = await blogService.create(blog)
      //blogFormRef.current.toggleVisibility()
      console.log(blog)
      createBlog(blog)
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }
  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog newBlog={newBlog} />
      </Togglable>

      <BlogList user={ user } />
    </div>
  )
}

export default App
