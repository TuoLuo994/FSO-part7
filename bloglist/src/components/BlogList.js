import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Paper,
  Table,
  TableBody
} from '@material-ui/core'


const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blog)
  return(
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs && blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              own={user.username===blog.user.username}
            />
          )}
        </TableBody>
      </Table>

    </TableContainer>
  )}
export default BlogList