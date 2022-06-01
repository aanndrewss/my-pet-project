import {getAuthUserData} from "./authReducer";
import { InferActionsTypes, TypedDispatch, BaseThunkType} from "./reduxStore";

let initialState = {
    initialized: false
}

export type InitialStateTypeApp = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateTypeApp => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch: TypedDispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer