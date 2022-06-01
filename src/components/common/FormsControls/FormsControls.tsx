import React from "react"
import classes from './FormsControls.module.scss'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form'

type FormsControlType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    typeFild: string
}

export const formsControls: React.FC<FormsControlType> = ({input, meta, typeFild, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            // @ts-ignore
            <div>
                <typeFild {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>