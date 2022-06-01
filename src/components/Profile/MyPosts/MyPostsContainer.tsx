import React from 'react';
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {actions} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost:
    actions.addPost})(MyPosts);

export default MyPostsContainer;