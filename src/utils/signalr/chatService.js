import { setupSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { addNewGroupChat, setNewMessage } from "src/features/ChatPage/chatSlice";


const connection = setupSignalRConnection('https://localhost:9001/hubchat');
export const startChatService = () => {

    connection.on('NhanMessage', message => {
        //console.log('nhan tin nhan: ', message);
        store.dispatch(setNewMessage(message));
    });

    connection.on('NewGroupChat', groupChat => {
        //console.log('them vao nhom chat moi: ', groupChat);
        store.dispatch(addNewGroupChat(groupChat));
    });
}

export const disconnectChatService = () => {
    connection.stop();
}