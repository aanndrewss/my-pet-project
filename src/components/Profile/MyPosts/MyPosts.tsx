import React from 'react';
import classes from './MyPosts.module.scss'
import Post from './Posts/Post';
import {useForm} from "react-hook-form";
import {Box, Button, TextField, Typography} from "@mui/material";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    postsData: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPost: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements = props.postsData.map(post => <Post message={post.message}
                                                          likeCounts={post.likeCounts}
                                                          key={post.postId} comments={post.comments}/>)

    const addNewPost = (formData: PostType) => {
        props.addPost(formData.newPost)
        console.log(formData)
        reset()
    }

    type PostType = {
        newPost: string
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<PostType>({
        mode: 'onBlur'
    })

    return (
        <Box sx={{margin: 1}}>
            <Typography className={classes.header} sx={{textAlign: 'center'}}>
                My Posts
            </Typography>
            <div className={classes.newpost}>
                <form onSubmit={handleSubmit(addNewPost)}>
                    <TextField
                        {...register('newPost', {
                            minLength: {
                                value: 3,
                                message: 'Minimal length is 3 symbols'
                            }
                        })}
                        variant='outlined'
                        label='New Post'
                        fullWidth
                        error={!!errors.newPost}
                        helperText={errors?.newPost?.message}
                    />
                    <Button sx={{marginTop: 1}} fullWidth type='submit' variant='contained'>Add post</Button>
                </form>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </Box>
    );
}


export default MyPosts;