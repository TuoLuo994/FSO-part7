import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  console.log(blog)
  const request = await axios.post(baseUrl, blog, getConfig())
  return request.data
}

const update = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getConfig())
  return id
}

const comment = async (comment, blog) => {
  const request = await axios.post(`${baseUrl}/${blog.id}/comments`, { 'comment': comment })
  return request.data
}

export default { getAll, create, update, remove, comment }