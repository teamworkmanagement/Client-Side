import { setupSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewMessage } from "src/features/ChatPage/chatSlice";


const connection = setupSignalRConnection('https://localhost:9001/hubchat');
export const startChatService = () => {

    connection.on('NhanMessage', message => {
        //console.log('nhan tin nhan: ', message);
        store.dispatch(setNewMessage(message));
    })
}

export const disconnectChatService = () => {
    connection.stop();
}