import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
      <div className='pageNotFound'>
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>Looks like page is not found on server !</h2>
      <Link to='/' className='pnf-btn'>
        return to home page
      </Link> 
      </div>
    </Layout>
  )
}

export default PageNotFound