import { setupSignalRConnection, startSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewAddReact, setNewComment, setRemoveReact } from "./signalrSlice";
import { SIGNALR_URL } from "../../env";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubpost`);

connection.on('NewAddReact', payload => {
    console.log("addreact");
    store.dispatch(setNewAddReact(payload));
})

connection.on('RemoveReact', payload => {
    console.log("removereact");
    store.dispatch(setRemoveReact(payload));
})

connection.on('NewComment', payload => {
    console.log('new comment: ', payload)
    store.dispatch(setNewComment(payload));
})
export const startPostService = () => {
    if (connection.state == 'Disconnected' || connection.state != 'Connected') {
        startSignalRConnection(connection);
    }
}


export const disconnectPostService = () => {
    connection.stop();
}