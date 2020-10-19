import React from 'react'
import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
  const id = useParams().id
  if(users){
    const user = users.find(n => n.id === id)
    return(
      <div>
        <h1>
          {user.name}
        </h1>
        <h3>
          Added Blogs
        </h3>
        <ul>
          {user.blogs.map(b => <li key={b.id}>{b.title}</li>
          )}
        </ul>
      </div>
    )
  }
  return(<div></div>)
}

export default UserView