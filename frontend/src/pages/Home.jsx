import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Navbar classname={`absolute`}/>
            <div className='flex items-center justify-center gap-10  bg-gray-200 w-full h-screen '>
                <Link to={'/customer/login'}>
                    <div className='h-[200px] shadow-2xl shadow-gray-300 rounded-2xl w-[200px] border border-gray-400  flex items-center justify-center hover:shadow-2xl hover:shadow-gray-400 transition-all'>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <PersonIcon className='scale-200 flex items-center justify-center' />
                            <h1 className='text-lg font-bold'>Customer</h1>
                        </div>
                    </div>
                </Link>
                <Link to={'/banker/login'}>
                    <div className='h-[200px] shadow-2xl shadow-gray-300 rounded-2xl w-[200px] border border-gray-400  flex items-center justify-center hover:shadow-2xl hover:shadow-gray-400 transition-all'>
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <AccountBalanceIcon className='scale-200 flex items-center justify-center' />
                            <h1 className='text-lg font-bold'>Banker</h1>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Home;