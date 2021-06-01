import React, { createContext, useReducer } from 'react'
import characters from './charactersReducer'

const initialState = {
    requestInfo: [],
    character: {},
    episodes: [],
    error: ''
}

const Store = ({children}) => {
    const [state, dispatch] = useReducer(characters, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            { children }
        </StoreContext.Provider>
    )
}

export const StoreContext = createContext(initialState);
export default Store;