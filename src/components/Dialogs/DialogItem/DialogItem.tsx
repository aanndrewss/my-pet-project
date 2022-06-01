import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.scss'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;