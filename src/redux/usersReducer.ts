import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersAPI";
import {UserType} from "../types/types";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users ID
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateUsers => {

    switch (action.type) {
        case "users/FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case "users/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case "users/SET_USERS": {
            return {...state, users: action.users}
        }
        case "users/SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "users/SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "users/TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "users/TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case 'users/SET_FILTER': {
            return {
                ...state,
                filter: action.payload
            }
        }
        default:
            return state;
    }
}

export type InitialStateUsers = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'users/SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}

export const getUsers = (page: number,
                             pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
        let data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(actions.followSuccess(userId))
        }
        dispatch(actions.toggleFollowingProgress(false, userId))
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userId))
        }
        dispatch(actions.toggleFollowingProgress(false, userId))
    }
}

export default usersReducer;