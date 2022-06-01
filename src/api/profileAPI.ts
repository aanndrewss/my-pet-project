import {instance, APIResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateUserStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
    }
}