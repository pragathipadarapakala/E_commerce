import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (<>
  <div className='footer'>
    <h4 className='text-center'>
        Footer Part reserved for e-commerce @2023
    </h4>
    <p className='text-center mt-3'>
      <Link to='/about'>About </Link>
      <Link to='/policy'>Policy </Link>
      <Link to='/contact'>Contact  </Link>
    </p>

  </div>
  </> )
}

export default Footer