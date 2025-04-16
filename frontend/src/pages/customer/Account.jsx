import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../../components/Navbar'
import { UserContext } from '../../context/UserContext'
import Button from '../../components/Button'
import AmountPopup from '../../components/popups/Popup'
import axios from 'axios'
import { backendUrl } from '../../App'
import { useNavigate } from 'react-router-dom'

function Account() {
    const { user } = useContext(UserContext);
    const [popupOpen, setPopupOpen] = useState(false);
    const [balance, setBalance] = useState(0);
    const [type, setType] = useState("Withdraw");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const { setUser} = useContext(UserContext);


    const handleAmountSubmit = async (amount) => {
        if (type=='Withdraw' &&  amount > balance) {
            toast.error('Insufficient Funds');
        } else {

            const transaction = await axios.post(`${backendUrl}/api/v1/customer/${type}`, {
                amount: amount
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            toast.success(`${type} Successful`);
            setBalance(transaction.data.balance);
        }
        setPopupOpen(false);
    }

    const handleLogout = async () => {
        try {
            const logout = await axios.get(`${backendUrl}/api/v1/auth/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            setUser(null);
            navigate('/customer/login');
            toast.success("Logged out successfully");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/customer/getBalance`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }

        }
        fetchBalance();
    })

    return (
        <div>
            <Navbar className={`static`} />
            <div className='h-screen  flex flex-col items-center justify-start  bg-gray-200 w-full p-8 gap-10'>
                <div className='flex items-center gap-5 bg-white shadow-2xl shadow-gray-300 rounded-2xl w-full h-[200px] border border-gray-400 '>
                    <div className='flex flex-col items-start justify-center gap-5 w-1/2 h-full border-r border-gray-400 px-10'>
                        <h1 className='text-xl'>Name: {user.username}</h1>
                        <h1 className='text-xl'>Email: {user.email}</h1>
                        <h1 className='text-xl'>Account ID: {user.id}</h1>
                    </div>
                    <div className='flex flex-col items-center justify-start p-10 gap-5 w-1/2 h-full '>
                        <h1 className='font-bold text-2xl'>Account Balance:</h1>
                        <h1 className='text-2xl'>INR. {balance}</h1>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-5  '>
                    <Button handlerFunc={() => {
                        setPopupOpen(true)
                        setType("Withdraw")
                    }} label={"Withdraw"} >Withdraw</Button>
                    <Button label={"Deposit"} handlerFunc={() => {
                        setPopupOpen(true)
                        setType("Deposit")
                    }}>Deposit</Button>
                </div>
                <div>
                <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md hover:cursor-pointer' onClick={handleLogout}>Log out</button>
                </div>
                <AmountPopup
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    onSubmit={() => handleAmountSubmit(amount)}
                    setAmount={setAmount}
                    amount={amount}
                    balance={balance}
                    popupType={type}
                />
            </div>
        </div>
    )
}

export default Account;