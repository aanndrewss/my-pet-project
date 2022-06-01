let initialState = {sidebar: {
        friends: [
            { id: 1, name: 'Arina' },
            { id: 2, name: 'Den' },
            { id: 3, name: 'Vlad' }
        ]
    }}

const sidebarReducer = (state = initialState, action) => {

    return state;
}

export default sidebarReducer;