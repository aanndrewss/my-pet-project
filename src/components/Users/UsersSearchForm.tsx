import React from "react";
import {useForm} from "react-hook-form";
import {FilterType} from "../../redux/usersReducer";

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('term', {})}
                    placeholder='Search'
                />
                <select{...register('friend', {})}>
                    <option value='null'>All</option>
                    <option value='true'>Only friends</option>
                </select>
                <div>
                    <button type='submit'>Find</button>
                </div>
            </form>
        </div>
    )
}