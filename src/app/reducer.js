const initialState = {
    currentPage: "login",
    userInfo: {
        authenticated: false,
        role:'',
    }
}

export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case 'setPage':
            return { ...state, currentPage: action.payload };
        case 'setAuthenticated':
            return { ...state, userInfo: action.payload }
    }
    return state;
}

