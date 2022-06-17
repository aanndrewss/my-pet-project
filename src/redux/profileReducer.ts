import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {profileAPI} from "../api/profileAPI";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {FormAction} from "redux-form/lib/actions";

let initialState = {
    postsData: [
        {
            id: 1,
            message: 'HI',
            likeCounts: 0,
        },
        {
            id: 2,
            message: 'My name andrew',
            likeCounts: 5,
        },
        {
            id: 3,
            message: 'HI love Arina',
            likeCounts: 23,
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateTypeProfile = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateTypeProfile => {

    switch (action.type) {
        case 'profile/ADD-POST':
            let newPost = {
                id: 5,
                message: action.newPost,
                likeCounts: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }

        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profile/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profile/SAVE_PHOTO_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actions = {
    addPost: (newPost: string) => ({type: 'profile/ADD-POST', newPost} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const)
}

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId)
        dispatch(actions.setUserProfile(response.data))
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
        dispatch(actions.setStatus(response.data))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos))
        }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch , getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
}


export default profileReducer;