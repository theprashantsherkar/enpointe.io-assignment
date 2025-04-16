import React from 'react'

function Button({label, handlerFunc}) {
    return <button
        onClick={handlerFunc}
        className='bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded hover:cursor-pointer'
    >
      {label}
  </button>
}

export default Button;