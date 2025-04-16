import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({classname }) {
  return (
      <div>
          <nav className={`flex w-full ${classname} justify-center items-center bg-gray-800 text-white p-6` }>
              <h1 className='font-bold text-4xl '>Banking System</h1>
          </nav>
    </div>
  )
}

export default Navbar