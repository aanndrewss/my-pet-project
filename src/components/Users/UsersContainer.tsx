import React from 'react';
import {useSelector} from 'react-redux';
import Preloader from "../common/preloader/preloader";
import {Users} from "./Users";
import {getIsFetching} from "../../redux/usersSelectors";

type UsersPagePropsType = {

}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}