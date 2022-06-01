import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.scss'
import MessageItem from './MessageItem/MessageItem';
import {useForm} from "react-hook-form";
import {InitialStateTypeDialogs} from "../../redux/dialogsReducer";

type PropsType = {
    dialog: InitialStateTypeDialogs
    addMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialog;

    let addNewMessage = (formData: DialogMessageType) => {
        props.addMessage(formData.dialogMessage)
        reset()
    }

    let dialogsElements = state.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>);
    let messagesElements = state.messagesData.map(message => <MessageItem key={message.id} message={message.message} />);

    type DialogMessageType = {
        dialogMessage: string
    }

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm<DialogMessageType>({
        mode: 'onBlur'
    })


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>
                    {messagesElements}
                </div>
                <form onSubmit={handleSubmit(addNewMessage)}>
                    <textarea
                        {...register('dialogMessage', {
                            required: 'Field is required',
                            minLength:{
                                value: 1,
                                message: 'Сообщение не может быть пустым'
                        }
                        })}
                    />
                <div>
                    {errors?.dialogMessage && <div style={{color: 'red'}}>{errors?.dialogMessage?.message || 'Error!'}</div>}
                </div>
                <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Dialogs;