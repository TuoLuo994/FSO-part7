import React from 'react'
import { Link } from 'react-router-dom'
import {
  TableRow,
  TableCell
} from '@material-ui/core'

const Blog = ({ blog }) => {

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }


  return (
    <TableRow className='blog'>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </TableCell>
    </TableRow>
  )
}

export default Blog