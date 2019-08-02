import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import climate from './climate'
import station from './station'
import weather from './weather'
import county from './county'

const rootReducer = combineReducers({
    climate,
    station,
    weather,
    county
})

export type AppState = ReturnType<typeof rootReducer>

const configureStore = () => {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const store = createStore( rootReducer, composeWithDevTools(middlewareEnhancer) )

    return store
}

export default configureStore