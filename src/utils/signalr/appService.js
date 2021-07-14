import {
  setupSignalRConnection,
  startSignalRConnection,
} from "./signalrConfig";
import store from "../../app/store";

import { SIGNALR_URL } from "../../env";
import { setCurrentUser } from "src/shared_components/views/pages/login/authSlice";
import { setJoinTeam, setLeaveTeam, setUpdateTeamInfo } from "./signalrSlice";
import { HubConnectionState } from "@microsoft/signalr";

const connection = setupSignalRConnection(`${SIGNALR_URL}/hubapp`);

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


export const startAppService = () => {
  if (connection.state === HubConnectionState.Disconnected) {
    startSignalRConnection(connection);
  }
};

export const disconnectAppService = () => {
  connection.stop();
};
