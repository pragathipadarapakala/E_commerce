import React from 'react'
import {NavLink} from 'react-router-dom'

const UserMenu = () => {
  return (
  <>
  <div className='text-center card'>
  <div className="list-group">
  <h4>
  <NavLink to='/dashboard/user'>Dashboard</NavLink></h4>
  <NavLink to="/dashboard/user/profile" class="list-group-item list-group-item-action active" aria-current="true">profile</NavLink>
  <NavLink to="/dashboard/user/orders" class="list-group-item list-group-item-action">Orders</NavLink> 
</div>
</div>
  </>
  )
}

export default UserMenu