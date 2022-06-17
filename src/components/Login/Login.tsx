import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from "../../redux/authReducer";
import {selectCaptcha, selectIsAuth} from "../../redux/authSelectors";
import {useTypedDispatch} from "../../redux/reduxStore";
import {Box, Button, Card, Checkbox, TextField, Typography} from "@mui/material";


export const Login = () => {
    const captchaUrl = useSelector(selectCaptcha)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useTypedDispatch()

    const onSubmit = (formData: LoginType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    type LoginType = {
        email: string
        password: string
        rememberMe: boolean
        captcha: null | string
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<LoginType>({
        mode: 'onBlur'
    })

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField sx={{margin: 1, marginTop: 4}} fullWidth
                           variant='outlined'
                           label='Email'
                           {...register('email', {
                               required: 'Field is required',
                               minLength: {
                                   value: 4,
                                   message: 'Minimum is 4 symbols'
                               }
                           })}
                           placeholder='Email' error={!!errors.email} helperText={errors?.email?.message}
                />
                <TextField sx={{margin: 1}} fullWidth
                           variant='outlined'
                           label='Password'
                           {...register('password', {
                               required: 'Field is required',
                               minLength: {
                                   value: 5,
                                   message: 'Minimum is 5 symbols'
                               }
                           })}
                           placeholder='Password'
                           type='password' error={!!errors.password} helperText={errors?.password?.message}
                />
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && <TextField
                    {...register('captcha', {
                        required: 'Field is required'
                    })}
                    placeholder='Symbols from image'
                />}
                <Button fullWidth sx={{margin: 1}} variant='contained' type='submit'>Login</Button>
            </form>
        </Box>
    )
}
