import {
  setupSignalRConnection,
  startSignalRConnection,
} from "./signalrConfig";
import store from "../../app/store";

import { SIGNALR_URL } from "../../env";
import { setCurrentUser } from "src/shared_components/views/pages/login/authSlice";
import { setCreateMeeting, setJoinTeam, setLeaveTeam, setReloadAppointment, setRemoveMeeting, setUpdateTeamInfo } from "./signalrSlice";
import { HubConnectionState } from "@microsoft/signalr";

export const connection = setupSignalRConnection(`${SIGNALR_URL}/hubapp`);

connection.on("UpdateUserInfo", (userInfo) => {
  console.log("UpdateUserInfo: ", userInfo);
  store.dispatch(setCurrentUser(userInfo));
});

connection.on("UpdateTeamInfo", (teamInfo) => {
  console.log("UpdateTeamInfo ", teamInfo);
  store.dispatch(setUpdateTeamInfo(teamInfo));
});

connection.on("LeaveTeam", (leaveTeam) => {
  console.log("LeaveTeam ", leaveTeam);
  store.dispatch(setLeaveTeam(leaveTeam));
});

connection.on("JoinTeam", (joinTeam) => {
  console.log("JoinTeam ", joinTeam);
  store.dispatch(setJoinTeam(joinTeam));
});

connection.on("CreateMeeting", (payload) => {
  console.log("CreateMeeting ", payload);
  store.dispatch(setCreateMeeting(payload));
});

connection.on("RemoveMeeting", (payload) => {
  console.log("RemoveMeeting ", payload);
  store.dispatch(setRemoveMeeting(payload));
});

connection.on("ReloadAppointment", payload => {
  console.log("ReloadAppointment ", payload);
  store.dispatch(setReloadAppointment(payload));
});

export const startAppService = () => {
  if (connection.state === HubConnectionState.Disconnected) {
    startSignalRConnection(connection);
  }
};

export const disconnectAppService = () => {
  connection.stop();
};
