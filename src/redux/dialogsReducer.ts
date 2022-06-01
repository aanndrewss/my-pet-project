import {InferActionsTypes} from "./reduxStore";

export type DialogType = {
    id: number
    name:string
}
type MessageType = {
    id: number
    message:string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Andrew', avatar: 'https://kinosvami.ru/wp-content/uploads/2021/03/xx42-1-1024x571.jpg'},
        {id: 2, name: 'Arina'},
        {id: 3, name: 'Den'},
        {id: 4, name: 'Vlad'},
        {id: 5, name: 'Stepan'}
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: 'hi'},
        {id: 2, message: 'fdsfsd'},
        {id: 3, message: 'hfhf'},
        {id: 4, message: 'gfsdg'},
        {id: 5, message: 'lioke'}
    ] as Array<MessageType>
}

export type InitialStateTypeDialogs = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateTypeDialogs => {

    switch (action.type) {
        case 'dialogs/ADD-MESSAGE':
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: action.newMessage}]
            };

        default:
            return state;
    }
}

export const actions = {
    addMessage: (newMessage: string) => ({type: 'dialogs/ADD-MESSAGE', newMessage} as const)
}

export default dialogsReducer;