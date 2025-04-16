import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Autocomplete, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { backendUrl } from '../../App';
import axios from 'axios';
import toast from 'react-hot-toast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const options = ['Customer', 'Banker'];

function CustomerRegister() {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState('')
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username || !value) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/register`, {
                email,
                username,
                role:value,
                password
            }, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            }
            );
            if (response.data.success) {
                navigate('/');
                toast.success(`Account created successfully, now login!`);
            } else {
                toast.error(response.data.message);
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
                <div className='flex flex-col items-center justify-center w-1/3 min-h-max bg-white shadow-lg rounded-lg p-5 gap-5'>
                    <h1 className='text-3xl font-bold mb-4 flex items-center justify-center gap-3'><ArrowBackIcon className='hover:cursor-pointer rounded-full border border-black scale-150' onClick={() => navigate(-1)} />Register Here</h1>
                    <FormControl className='flex flex-col gap-5 '>

                        <TextField
                            id="outlined-basic"
                            label="User name"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <FormControl variant='outlined'>
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
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={options}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Role" />}
                        />
                        <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Register</Button>
                    </FormControl>
                </div>
            </div>
        </>
    )
}

export default CustomerRegister