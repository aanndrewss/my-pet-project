import React from "react";
import {useForm} from "react-hook-form";
import {FilterType} from "../../redux/usersReducer";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './Users.module.scss'

export type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: FormType) => {
        const filter: FilterType = {
            term: formData.term,
            friend: formData.friend === 'null' ? null : formData.friend === 'true'
        }
        props.onFilterChanged(filter)
        console.log(filter)
    }
    type FormType = {
        term: string
        friend: 'true' | 'false' | 'null'
    }
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<FormType>({
        mode: 'onBlur'
    })

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.mainForm}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 1}}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                <TextField
                    {...register('term', {})}
                    placeholder='Search'
                    type='search'
                    variant='standard'
                    label='Search'
                    size='small'
                />
                </Box>
                <select{...register('friend', {})} className={styles.select}>
                    <option value='null'>All</option>
                    <option value='true'>Only friends</option>
                </select>
                <div>
                    <Button sx={{margin: 1}} variant='outlined' type='submit'>Find</Button>
                </div>
            </form>
        </div>
    )
}