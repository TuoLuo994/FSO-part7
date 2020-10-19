import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Button, TextField } from '@material-ui/core'

const BlogView = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blog)
  const blog = blogs.find(n => n.id === id)
  const dispatch = useDispatch()
  const history = useHistory()
  const [ comment, setComment ] = useState('')


  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(deleteBlog(blogToRemove))
      dispatch(setNotification(`you deleted '${blogToRemove.title}'`, 5))
      history.push('/')
    }
  }
  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
    dispatch(setNotification(`you voted '${blogToLike.title}'`, 5))
  }

  const handleComment = async (id) => {
    const blogToCommentOn = blogs.find(b => b.id === id)
    dispatch(commentBlog(blogToCommentOn, comment))
    console.log(comment)
    dispatch(setNotification(`you commented on '${blogToCommentOn.title}'`, 5))
  }

  if(blogs.length <= 0){
    return null
  }
  return(
    <div>
      <List>
        <ListItem>{blog.title}</ListItem>
        <ListItem>
          <a href={`https://${blog.url}`}>{blog.url}</a>
        </ListItem>
        <ListItem>
          <div>{blog.likes} likes<button onClick={() => handleLike(blog.id)}>like</button></div>
        </ListItem>
        <ListItem>
          <div>added by {blog.author}</div>
        </ListItem>
        <Button color='inherit' onClick={() => handleRemove(blog.id)}>remove</Button>
      </List>
      <h2>Comments</h2>
      <form onSubmit={() => handleComment(blog.id)}>
        <TextField
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}>
        </TextField>
        <Button type='submit' color='inherit' id="comment">add comment</Button>
      </form>
      <List>
        {blog.comments.map(c =>
          <ListItem key={c}>
            {c}
          </ListItem>
        )}
      </List>
    </div>)
}

export default BlogView