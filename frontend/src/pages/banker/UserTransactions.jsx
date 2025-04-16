import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function UserTransactions() {
    const [transactions, setTransactions] = React.useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/banker/getAccounts?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials:true,
                });
                if (response.data.success) {
                    setTransactions(response.data.rows);
                    toast.success("Transactions fetched successfully");
                    console.log(response.data.rows);
                } else {
                    console.error(response.data.message);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchTransactions();
    }, [id]);
    return (
      <>
          <Navbar classname={`static`}/>
          <div className='min-h-fit  flex flex-col items-center justify-start  bg-gray-200 w-full p-8 gap-4'>
                <h1 className='text-3xl  text-center'>User Transactions</h1>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center w-full'>
                        {transactions.length === 0 ? (<>No Transactions from this account yet</>) : <table className='w-full '>
                            <thead>
                                <tr className='bg-gray-300 p-2'>
                                    <th className='px-4 py-2 border border-black'>Transaction ID</th>
                                    <th className='px-4 py-2 border border-black'>Account ID</th>
                                    <th className='px-4 py-2 border border-black'>Transaction Type</th>
                                    <th className='px-4 py-2 border border-black'>Amount</th>
                                    <th className='px-4 py-2 border border-black'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td className='px-4 py-2 border border-black'>{transaction.id}</td>
                                        <td className='px-4 py-2 border border-black'>{transaction.user_id}</td>
                                        <td className='px-4 py-2 border border-black'>{transaction.transaction_type}</td>
                                        <td className='px-4 py-2 border border-black'>{transaction.amount}</td>
                                        <td className='px-4 py-2 border border-black'>{new Date(transaction.transaction_time).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
          </div>
      </>
  )
}

export default UserTransactions