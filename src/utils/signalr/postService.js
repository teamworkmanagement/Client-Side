import { setupSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewAddReact, setRemoveReact } from "./signalrSlice";

const connection = setupSignalRConnection('https://localhost:9001/hubpost');
export const startPostService = () => {

    connection.on('NewAddReact', payload => {
        store.dispatch(setNewAddReact(payload));
    })

    connection.on('RemoveReact', payload => {
        store.dispatch(setRemoveReact(payload));
    })
}

export const disconnectPostService = () => {
    connection.stop();
}