import React from 'react'
import {NavLink} from 'react-router-dom'

const AdminMenu = () => {
  return (
  <>
  <div className='text-center card'>
  <div className="list-group">
  <h4>Admin Panel</h4>
  <NavLink to="/dashboard/admin/create-category" class="list-group-item list-group-item-action active" aria-current="true">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" class="list-group-item list-group-item-action">Create Product</NavLink>
 
  <NavLink to="/dashboard/admin/products" class="list-group-item list-group-item-action">Products</NavLink> 
 <NavLink to="/dashboard/admin/user" class="list-group-item list-group-item-action">User</NavLink> 
 </div>
</div>
  </>
  )
}

export default AdminMenu