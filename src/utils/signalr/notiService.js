import { setupSignalRConnection, startSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { setNewNoti } from "src/appSlice";



const connection = setupSignalRConnection('https://localhost:9001/hubnoti');
export const startNotiService = () => {

    startSignalRConnection(connection);
    connection.on('SendNoti', payload => {
        store.dispatch(setNewNoti(payload));
    })
}

export const disconnectNoti = () => {
    connection.stop();
}
/*connection.on('SendNoti', payload => {
    store.dispatch(setNewNoti(payload));
})
*/