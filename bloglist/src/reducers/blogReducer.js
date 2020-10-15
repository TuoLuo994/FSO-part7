import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data.sort(byLikes)
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE':
    console.log(action.data)
    return state.filter(a => a.id!==action.data)
  case 'LIKE':
    return state.map(a => a.id===action.data.id ? action.data : a).sort(byLikes)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    console.log(data)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const data = await blogService.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.remove(blog.id)
    console.log(data)
    dispatch({
      type: 'REMOVE',
      data
    })
  }

}

export default reducer