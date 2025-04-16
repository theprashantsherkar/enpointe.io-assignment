import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/banker/Login'
import Register from './pages/banker/Register'
import CustomerLogin from './pages/customer/Login'
import CustomerRegister from './pages/customer/Register'
import Transactions from './pages/banker/Transactions'
import Account from './pages/customer/Account'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { UserContext } from './context/UserContext'
import axios from 'axios'
import UserTransactions from './pages/banker/UserTransactions'

export const backendUrl = 'http://localhost:9000'

function App() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${backendUrl}/api/v1/auth/user`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    fetchUser();
  })


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/banker'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path={`transactions/:id`} element={<UserTransactions />} />
        </Route>
        <Route path='/customer'>
          <Route path='login' element={<CustomerLogin />} />
          <Route path='register' element={<CustomerRegister />} />
          <Route path='account' element={<Account />} />
        </Route>

      </Routes>
      <Toaster />

    </Router>
  )
}

export default App