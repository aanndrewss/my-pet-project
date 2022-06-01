import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
// @ts-ignore
import {RouteComponentProps} from "react-router";
import {AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profileReducer";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType &RouteComponentProps<PathParamsType>;

const withRouter = (WrappedComponent: JSX.IntrinsicAttributes) => (props: JSX.IntrinsicAttributes) => {
    const params = useParams();
    return (
        // @ts-ignore
        <WrappedComponent
            {...props}
            params={params}
            />
    )
}

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.params.userId;
        if (!userId){
            userId=this.props.authorizedUserId;
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.params.userId !== prevProps.params.userId){
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile profile={null} status={""} {...this.props}
                         updateUserStatus={this.props.updateUserStatus}
                         isOwner={!this.props.params.userId}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
