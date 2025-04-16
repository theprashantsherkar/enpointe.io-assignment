import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
import axios from 'axios';
import { backendUrl } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

function Transactions() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const logout = await axios.get(`${backendUrl}/api/v1/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            setUser(null);
            navigate('/banker/login');
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/banker/getUsers`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setUsers(response.data.rows);
                    setLoading(false);
                } else {
                    console.error(response.data.message);
                }
            } catch(err) {
                console.error(err);
            }
        }
        fetchUsers();
    })
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Navbar classname={`static`} />

            <div className='h-screen  flex flex-col items-center justify-start  bg-gray-200 w-full p-8 gap-4'>
                <div>
                    <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md hover:cursor-pointer' onClick={handleLogout}>Log out</button>
                </div>
                {users.map((user, index) => (
                    <div className='flex  items-center justify-around gap-2 bg-white shadow-2xl shadow-gray-300 rounded-2xl w-1/2 h-[120px] border border-gray-400 ' key={index}>
                        <div className='flex flex-col items-start justify-center w-1/2 h-full px-6'>
                            <p>Account Id: {user.id }</p>
                            <h1>Owner's Name: { user.username}</h1>
                            <p>Email: { user.email}</p>
                        </div>
                        <div className='flex flex-col items-end justify-end p-5 w-1/2 h-full '>
                            <Link to={`/banker/transactions/${user.id}`}>
                                <Button label={"View Transactions"} >
                                    View Transactions
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transactions