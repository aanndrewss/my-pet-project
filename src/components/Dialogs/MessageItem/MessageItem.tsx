import React, { Component } from 'react';
import classes from './MessageItem.module.scss'

type PropsType = {
    message: string
}

const MessageItem: React.FC<PropsType> = (props) => {

    return (
        <div className={classes.content}>
            <div className={classes.message}>
                {props.message}
            </div>
        </div>
    )
}

export default MessageItem;