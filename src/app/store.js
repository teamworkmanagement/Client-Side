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
import testReducer from '../api/testSlice';
import chatReducer from '../features/ChatPage/chatSlice';
import kanbanReducer from '../features/KanbanBoard/kanbanSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['app', 'test', 'chat', 'kanban'],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    test: testReducer,
    chat: chatReducer,
    kanban: kanbanReducer,
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