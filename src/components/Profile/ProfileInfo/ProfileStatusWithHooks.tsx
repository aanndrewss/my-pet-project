import React, {ChangeEvent, useEffect, useState} from "react"
import classes from './ProfileInfo.module.scss'

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <>
            {!editMode &&
                    <span onDoubleClick={activateEditMode} className={classes.status}> <div className={classes.textStatus}>{props.status || 'Расскажите о себе'}</div></span>
            }
            {editMode &&
                <div className={classes.statusArea}>
                    <input onChange={onStatusChange} onBlur={deactivateEditMode}
                           autoFocus={true} value={status}/>
                </div>
            }
        </>
    )
}

export default ProfileStatusWithHooks