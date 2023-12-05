import React, { useState } from 'react'
import './login.css'
import { Alert, AlertTitle, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../../components/logo/Logo';
import Button from '../../components/button/Button';
import { formValidation, loginValidation } from '../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [inputData, setInputData] = useState({
        email: 'newtestalta@yopmail.com',
        password: '123456789'
    })

    const [error, setError] = useState(null)

    const inputHandler = (e) => {
        setError(null)

        setInputData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const isFormValid = await loginValidation.isValid(inputData, {
            abortEarly: false,
        })

        if (!isFormValid) {
            const error = await formValidation(loginValidation, inputData)
            return setError(error)
        }

        dispatch(login(inputData, navigate))

    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className='login'>
            <div className="bg-area">
                <img src='/main-bg.jpg' alt="justbook" />
            </div>
            <div className="content">
                <Logo />
                {
                    (error || authState.error) && <Alert severity="error" sx={{ width: '100%' }}>
                        <AlertTitle><span>{error || authState.error}</span></AlertTitle>
                    </Alert>
                }

                <form onSubmit={submitHandler}>
                    <TextField
                        fullWidth
                        label="Email"
                        id="email"
                        name="email"
                        value={inputData.email}
                        onChange={inputHandler}
                    />
                    <FormControl
                        fullWidth
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            value={inputData.password}
                            onChange={inputHandler}
                        />
                    </FormControl>

                    <div className='button-area'>
                        <Button type="submit" text="login" />
                        {/* <p>forgot password?</p> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login