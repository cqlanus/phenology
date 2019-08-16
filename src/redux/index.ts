import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import climate from './climate'
import station from './station'
import weather from './weather'
import county from './county'
import ui from './ui'
import plants from './plants'
import entities from './entities'
import auth from './auth'

const rootReducer = combineReducers({
    climate,
    station,
    weather,
    county,
    ui,
    plants,
    entities,
    auth
})

export type AppState = ReturnType<typeof rootReducer>

const configureStore = () => {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const store = createStore( rootReducer, composeWithDevTools(middlewareEnhancer) )

    return store
}

export default configureStore