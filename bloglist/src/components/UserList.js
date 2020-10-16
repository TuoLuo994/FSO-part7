import React from 'react'

const User = ({ user }) => {
  return(
    <tr>
      <td>
        {user.name}
      </td>
      <td>
        {user.blogs.length}
      </td>
    </tr>
  )
}

const UserList = ({ users }) => {
  if(users){
    return(
      <div>
        <h2>Users</h2>
        <table>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <User key={user.id} user={user} />
          )}
        </table>
      </div>
    )}
  return(<div>no users</div>)
}

export default UserList