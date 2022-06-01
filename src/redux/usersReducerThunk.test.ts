import {actions, follow, unfollow} from './usersReducer'
import {usersAPI} from '../api/usersAPI'
import {APIResponseType, ResultCodesEnum} from '../api/api'

jest.mock('../api/usersAPI')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unfollowUser.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

test('success follow thunk', async () => {
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})