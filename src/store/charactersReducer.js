const characters = (state, action) => {
    switch (action.type) {
        case "SET_CHARACTER":
            return {
                ...state,
                character: action.payload
            }
        case "SET_REQUEST_DATA":
            return {
                ...state,
                requestInfo: action.payload
            }
        case "SET_EPISODES":
            return {
                ...state,
                episodes: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
} 

export default characters;