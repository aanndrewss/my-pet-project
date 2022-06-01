import React, {ChangeEvent, useState} from 'react'
import classes from './ProfileInfo.module.scss'
import Preloader from "../../common/preloader/preloader"
import userPhoto from '../../../assets/img/userPhoto.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {Card} from "@mui/material";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <Card sx={{minWidth: 300, margin: 1}}>
            <div className={classes.descriptionBlock}>
                <div className={classes.profileBlock}>
                    <div className={classes.avatarBlock}>
                        <img className={classes.avatar}
                             src={profile.photos.small != null ? profile.photos.small : userPhoto}/>
                        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    </div>
                    <div className={classes.statusBlock}>
                        <div className={classes.fullname}>Полное имя: {profile.fullName}</div>
                        <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                    </div>
                </div>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
            </div>
        </Card>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob &&
            <div>My professional skills: {profile.lookingForAJobDescription}</div>}
        <div>About me: {profile.aboutMe}</div>
        <div>Contacts: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}</div>
    </div>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;