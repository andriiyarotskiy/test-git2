import {combineReducers, createStore} from "redux";
import countReducer from "./countReducer";


const rootReducer = combineReducers({
    count : countReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>