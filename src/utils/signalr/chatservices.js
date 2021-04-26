import { setupSignalRConnection } from "./config"
import store from '../../app/store';
import { setNewMessage } from "src/appSlice";

export const start = () => {
    const connection = setupSignalRConnection('https://localhost:9001/hubchat');

    connection.on('NhanMessage', message => {
        store.dispatch(setNewMessage(message));
    })
}