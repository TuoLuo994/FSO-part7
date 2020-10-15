import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const handleLike = async (id) => {
    console.log(id)
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
    dispatch(setNotification(`you voted '${blogToLike.title}'`, 5))
  }

  const handleRemove = async (id) => {
    console.log(id)
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(deleteBlog(blogToRemove))
      dispatch(setNotification(`you deleted '${blogToRemove.title}'`, 5))
    }
  }
  console.log(blogs)
  return(
    <div>
      {blogs && blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )}
export default BlogList