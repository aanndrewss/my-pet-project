import React, {ComponentType} from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {actions, DialogType} from "../../redux/dialogsReducer";
import {AppStateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    dialog: Array<DialogType>
}

type MapDispatchPropsType = {
    addMessage: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        dialog: state.dialogPage
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect
)(Dialogs);