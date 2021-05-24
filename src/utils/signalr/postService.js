import { setupSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewAddReact, setNewComment, setRemoveReact } from "./signalrSlice";

const connection = setupSignalRConnection('https://api.ezteam.engineer/hubpost');
export const startPostService = () => {

    connection.on('NewAddReact', payload => {
        store.dispatch(setNewAddReact(payload));
    })

    connection.on('RemoveReact', payload => {
        store.dispatch(setRemoveReact(payload));
    })

    connection.on('NewComment', payload => {
        store.dispatch(setNewComment(payload));
    })
}

export const disconnectPostService = () => {
    connection.stop();
}