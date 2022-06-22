import React from 'react'
import styles from './Post.module.scss'

type PropsType = {
    comment: string
}

const CommentItem: React.FC<PropsType> = ({comment}) => {
    return (
        <div className={styles.commentBlock}>
            <div className={styles.userInfo}>
                User Info
            </div>
            <div className={styles.commentItem}>
                {comment}
            </div>
        </div>
    )
}

export default CommentItem