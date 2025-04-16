import React, { useContext } from 'react';
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl } from '../../App';

function Login() {
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn } = useContext(UserContext);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        try {

            const response = await axios.post(`${backendUrl}/api/v1/auth/banker/login`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setUser(response.data.user);
                setIsLoggedIn(true);
                navigate('/banker/transactions');
                toast.success(`Welcome back!`);
            } else {
                return toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Please try again later.");
      }
        
    }

    return (
        <>
            <Navbar classname={`absolute`} />
            <div className='flex items-center justify-center w-full h-screen '>
                <div className='flex flex-col items-center justify-center w-1/3 h-1/2 bg-white shadow-lg rounded-lg p-5 gap-5'>
                    <h1 className='text-3xl font-bold mb-4'>Banker's Login</h1>
                    <FormControl className='flex flex-col gap-5 '>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormControl variant='outlined'  >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onMouseUp={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </FormControl>
                    <Button label='Login' handlerFunc={(e) => handleSubmit(e)} />
                </div>
            </div>
        </>
    )
}

export default Login