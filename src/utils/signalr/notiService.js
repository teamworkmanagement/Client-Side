import {
  setupSignalRConnection,
  startSignalRConnection,
} from "./signalrConfig";
import store from "../../app/store";
import { setNewNoti } from "src/appSlice";
import { SIGNALR_URL } from "../../env";
import { HubConnectionState } from "@microsoft/signalr";
import { setReminder } from "./signalrSlice";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubnoti`);
connection.on("SendNoti", (payload) => {
  store.dispatch(setNewNoti(payload));
});

connection.on("Reminder", (payload) => {
  console.log(payload);
  store.dispatch(setReminder(payload));
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
