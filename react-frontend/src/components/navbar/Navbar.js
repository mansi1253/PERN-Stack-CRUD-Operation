import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='d-flex bg-dark text-light px-5 py-2'>
      <div className='fs-4'><Link to='/' className='link'>Products</Link></div>
      <div className='mx-5 fs-4'><Link to='/category' className='link'>Category</Link></div>
    </div>
  )
}

export default Navbar