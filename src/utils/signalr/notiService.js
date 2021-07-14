import {
  setupSignalRConnection,
  startSignalRConnection,
} from "./signalrConfig";
import store from "../../app/store";
import { setNewNoti } from "src/appSlice";
import { SIGNALR_URL } from "../../env";
import { HubConnectionState } from "@microsoft/signalr";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubnoti`);
connection.on("SendNoti", (payload) => {
  store.dispatch(setNewNoti(payload));
});
export const startNotiService = () => {
  if (connection.state === HubConnectionState.Disconnected) {
    startSignalRConnection(connection);
  }
};

export const disconnectNoti = () => {
  connection.stop();
};
/*connection.on('SendNoti', payload => {
    store.dispatch(setNewNoti(payload));
})
*/
