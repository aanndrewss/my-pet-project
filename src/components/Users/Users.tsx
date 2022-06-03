import React, {useEffect} from "react";
import userPhoto from "../../assets/img/userPhoto.jpg";
import {NavLink, useSearchParams} from "react-router-dom";
import Paginator from "../common/Paginator/paginator";
import {FilterType, getUsers, follow, unfollow} from '../../redux/usersReducer';
import {UsersSearchForm} from "./UsersSearchForm";
import {useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersInfo
} from '../../redux/usersSelectors';
import {useTypedDispatch} from "../../redux/reduxStore";
import {Avatar} from "@mui/material";

type PropsType = {

}

export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsersInfo)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getFilter)

    const dispatch = useTypedDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    let termQuery = searchParams.get('term');
    let friendQuery = searchParams.get('friend');
    let pageQuery = searchParams.get('page');


    useEffect(() => {
        let actualPage = currentPage
        let actualFilter = filter
        if (!!pageQuery) actualPage = Number(pageQuery)

        if (!!termQuery) actualFilter = {...actualFilter, term: termQuery as string}
        switch(friendQuery) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {

        if (!!filter.term) termQuery = filter.term
        if (filter.friend !== null) friendQuery = String(filter.friend)
        if (currentPage !== 1) pageQuery = String(currentPage)
        // @ts-ignore
        setSearchParams({term: filter.term, friend: filter.friend, page: currentPage})
    }, [filter, currentPage])



    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const unfollow_ = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const follow_ = (userId: number) => {
        dispatch(follow(userId))
    }

    return (
        <><UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount} pageSize={pageSize}/>
                <div>
                    {users.map(user => <div key={user.id}>
                        <div>
                            <div >
                                <NavLink to={'./../profile/' + user.id}>
                                    <Avatar src={user.photos.small != null ? user.photos.small : userPhoto}/>
                                </NavLink>
                            </div>
                            <div >
                                {user.followed
                                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                                              onClick={() => {
                                                  unfollow_(user.id);
                                              }}>Unfollow</button>
                                    : <button disabled={followingInProgress.some(id => id === user.id)}
                                              onClick={() => {
                                                  follow_(user.id);
                                              }}>Follow</button>}
                            </div>
                            <div>
                                <div>
                                    {user.name}
                                </div>
                                <div>
                                    {user.status}
                                </div>
                            </div>
                        </div>
                    </div>)}</div>
            </div>
        </>
    )
}