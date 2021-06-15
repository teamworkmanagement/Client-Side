import { setupSignalRConnection, startSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewAddReact, setNewComment, setRemoveReact } from "./signalrSlice";

const connection = setupSignalRConnection('https://localhost:9001/hubpost');

export const startPostService = () => {
    startSignalRConnection(connection);
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
}


export const disconnectPostService = () => {
    connection.stop();
}