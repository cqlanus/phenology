import { combineReducers, configureStore, Action } from 'redux-starter-kit'
import { ThunkAction } from 'redux-thunk'

import climate from './climate'
import station from './station'
import weather from './weather'
import county from './county'
import ui from './ui'
import plants from './plants'
import entities from './entities'
import auth from './auth'
import user from './user'
import garden from './garden'
import planting from './planting'
import phenophase from './phenophase'
import entry from './entry'

const rootReducer = combineReducers({
    entities,
    climate,
    station,
    weather,
    county,
    ui,
    auth,
    user,
    garden,
    planting,
    plants,
    phenophase,
    entry
})


const store = configureStore({ reducer: rootReducer })

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>

export default store