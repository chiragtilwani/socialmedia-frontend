function AuthReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return action.user
        default :return state
    }
}

export default AuthReducer