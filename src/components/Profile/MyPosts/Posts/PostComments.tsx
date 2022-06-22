import React from 'react'
import {Card, Typography} from "@mui/material";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import styles from './Post.module.scss'


type PropsType = {
    comments: Array<string>
}

const PostComments: React.FC<PropsType> = ({comments}) => {
    return (
        <div className={styles.fade}>
            <Typography sx={{textAlign: 'center'}} variant='h4' component='h3'>Comments</Typography>
            <AddComment/>
            {comments?.length ? (
                    <div>
                        {comments.map(comment =>
                            <CommentItem comment={comment}/>
                        )}
                    </div>)
                : (
                    <p className={styles.commentItem}>No comments!</p>
                )}
        </div>
    )
}

export default PostComments