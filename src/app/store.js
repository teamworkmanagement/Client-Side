import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../appSlice';

const rootReducer = {
    app: appReducer,
}

const store = configureStore(
    {
        reducer: rootReducer,
    }
);

export default store;