import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from "../../redux/authReducer";
import {selectCaptcha, selectIsAuth} from "../../redux/authSelectors";
import {useTypedDispatch} from "../../redux/reduxStore";


export const Login = () => {
    const captchaUrl = useSelector(selectCaptcha)
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useTypedDispatch()

    const onSubmit = (formData: LoginType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'} />
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('email', {
                        required: 'Field is required',
                        minLength: {
                            value: 4,
                            message: 'Minimum is 4 symbols'
                        }
                    })}
                    placeholder='Email'
                />
                <div>
                    {errors?.email && <div style={{color: 'red'}}>{errors?.email?.message || 'Error'}</div>}
                </div>
                <input
                    {...register('password', {
                        required: 'Field is required',
                        minLength: {
                            value: 5,
                            message: 'Minimum is 5 symbols'
                        }
                    })}
                    placeholder='Password'
                    type='password'
                />
                <div>
                    {errors?.password && <div style={{color: 'red'}}>{errors?.password?.message || 'Error'}</div>}
                </div>

                <input
                    {...register('rememberMe', {
                        required: 'Field is required',
                    })}
                    type='checkbox'
                />
                <div>remember me</div>
                {captchaUrl && <img src={captchaUrl} />}
                {captchaUrl && <input
                    {...register('captcha', {
                        required: 'Field is required'
                    })}
                    placeholder='Symbols from image'
                />}
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}
