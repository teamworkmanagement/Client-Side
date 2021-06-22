import { setupSignalRConnection, startSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { addNewGroupChat, setNewMessage, updateGroupChatImage } from "src/features/ChatPage/chatSlice";
import {SIGNALR_URL} from "../../env";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubchat`);

connection.on('NhanMessage', message => {
    console.log('nhan tin nhan: ', message);
    store.dispatch(setNewMessage(message));
});

connection.on('NewGroupChat', groupChat => {
    //console.log('them vao nhom chat moi: ', groupChat);
    store.dispatch(addNewGroupChat(groupChat));
});

connection.on("ChangeGroupAvatar", payload => {
    store.dispatch(updateGroupChatImage(payload));
})
export const startChatService = () => {
    startSignalRConnection(connection);
}

export const disconnectChatService = () => {
    connection.stop();
}