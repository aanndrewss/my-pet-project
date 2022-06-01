import React from 'react';
import classes from './MyPosts.module.scss'
import Post from './Posts/Post';
import {useForm} from "react-hook-form";
import {Box} from "@mui/material";
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
                                                          key={post.id}/>)

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
        <Box>
            <div className={classes.header}>
                My posts
            </div>
            <div className={classes.newpost}>
                <form onSubmit={handleSubmit(addNewPost)}>
            <textarea
                {...register('newPost', {
                    minLength: {
                        value: 3,
                        message: 'Пост должен содержать минимум 3 символ.'
                    }
                })}
            />
                    <div>{errors?.newPost && <div style={{color: 'red'}}>{errors?.newPost?.message || 'Error'}</div>}</div>
                    <button type='submit'>Add post</button>
                </form>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </Box>
    );
}


export default MyPosts;