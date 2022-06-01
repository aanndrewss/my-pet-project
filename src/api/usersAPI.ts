import {instance, GetItemsResponseType, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data
            })
    },
    followUser(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => {
                return response.data
            }) as Promise<APIResponseType>
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            }) as Promise<APIResponseType>
    }
}