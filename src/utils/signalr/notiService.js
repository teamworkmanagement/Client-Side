import {
  setupSignalRConnection,
  startSignalRConnection,
} from "./signalrConfig";
import store from "../../app/store";
import { setNewNoti } from "src/appSlice";
import { SIGNALR_URL } from "../../env";
import { HubConnectionState } from "@microsoft/signalr";
import { setReminder } from "./signalrSlice";
import { addAlarm } from "./../../appSlice.js";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubnoti`);
connection.on("SendNoti", (payload) => {
  store.dispatch(setNewNoti(payload));
});

connection.on("Reminder", (payload) => {
  store.dispatch(addAlarm(payload));
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
