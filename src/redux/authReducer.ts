import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {InferActionsTypes, BaseThunkType} from "./reduxStore";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {FormAction} from "redux-form/lib/actions";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateTypeAuth = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): InitialStateTypeAuth => {

    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        data: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
            type: 'auth/GET_CAPTCHA_URL_SUCCESS',
            data: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;