import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../appSlice';
import authReducer from '../shared_components/views/pages/login/authSlice';

const rootReducer = {
    app: appReducer,
    auth: authReducer,
};

const store = configureStore(
    {
        reducer: rootReducer,
    }
);

export default store;