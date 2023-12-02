import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/userMenu'

const Orders = () => {
  return (
    <Layout>
          <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'> 
            <UserMenu/>
            </div>
            <div className='col-md-7 '>
                <div className='card w-55 p-3'>
                   <h2>All Orders </h2>
                </div>

            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Orders