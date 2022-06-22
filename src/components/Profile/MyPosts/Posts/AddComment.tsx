import React from 'react'
import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {inspect} from "util";
import styles from './Post.module.scss'

type PropsType = {}

const AddComment: React.FC<PropsType> = (props) => {

    type PostType = {
        newComment: string
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<PostType>({
        mode: 'onBlur'
    })

    const addNewComment = () => {

    }

    return (
        <div>
            <form onSubmit={handleSubmit(addNewComment)} className={styles.wrapperForm}>
                    <TextField
                        {...register('newComment', {
                            minLength: {
                                value: 1,
                                message: 'Minimal length is 1 symbols'
                            }
                        })}
                        variant='outlined'
                        label='New Comment'
                        error={!!errors.newComment}
                        helperText={errors?.newComment?.message}
                        size='small'
                        sx={{margin: 1}}
                    />
                    <Button variant='outlined' type='submit' sx={{margin: 1}}>Send</Button>
            </form>
        </div>
    )
}

export default AddComment