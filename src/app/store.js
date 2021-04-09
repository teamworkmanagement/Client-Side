import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer,
    PURGE,
    REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '../appSlice';
import { combineReducers } from "redux";
import authReducer from '../shared_components/views/pages/login/authSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['app'],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    }
);

export default store;