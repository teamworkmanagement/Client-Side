import {
    setupSignalRConnection,
    startSignalRConnection,
  } from "./signalrConfig";
  import store from "../../app/store";
  
  import { SIGNALR_URL } from "../../env";
import { setCurrentUser } from "src/shared_components/views/pages/login/authSlice";
import { setUpdateTeamInfo } from "./signalrSlice";
  
  const connection = setupSignalRConnection(`${SIGNALR_URL}/hubapp`);
  
  connection.on("UpdateUserInfo", (userInfo) => {
    console.log("UpdateUserInfo: ", userInfo);
    store.dispatch(setCurrentUser(userInfo));
  });

  connection.on("UpdateTeamInfo", (teamInfo) => {
    console.log("UpdateTeamInfo ", teamInfo);
    store.dispatch(setUpdateTeamInfo(teamInfo));
  });
  

  export const startAppService = () => {
    if (connection.state === "Disconnected" || connection.state !== "Connected") {
      startSignalRConnection(connection);
    }
  };
  
  export const disconnectAppService = () => {
    connection.stop();
  };
  