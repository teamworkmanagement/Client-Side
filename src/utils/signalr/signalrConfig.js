import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";

const isDev = process.env.NODE_ENV === 'development' ? true : false;
//process.env.NODE_ENV === 'development';

export const startSignalRConnection = async (connection) => {
  try {
    if (connection.state === HubConnectionState.Disconnected) {
      await connection.start();
      console.log("SignalR connection established", connection.connectionId);
    }
  } catch (err) {
    console.log("SignalR Connection Error: ", err);
    setTimeout(() => startSignalRConnection(connection), 5000);
  }
};

// Set up a SignalR connection to the specified hub URL, and actionEventMap.
// actionEventMap should be an object mapping event names, to eventHandlers that will
// be dispatched with the message body.
export const setupSignalRConnection = (connectionHub, actionEventMap = {}) => {
  const options = {
    logMessageContent: isDev,
    logger: isDev ? LogLevel.Warning : LogLevel.Error,
    skipNegotiation: false,
    transport: HttpTransportType.WebSockets
  };
  // create the connection instance
  // withAutomaticReconnect will automatically try to reconnect
  // and generate a new socket connection if needed
  const connection = new HubConnectionBuilder()
    .withUrl(connectionHub, options)
    .withAutomaticReconnect()
    .withHubProtocol(new JsonHubProtocol())
    .configureLogging(LogLevel.Information)
    .build();

  // Note: to keep the connection open the serverTimeout should be
  // larger than the KeepAlive value that is set on the server
  // keepAliveIntervalInMilliseconds default is 15000 and we are using default
  // serverTimeoutInMilliseconds default is 30000 and we are using 60000 set below
  connection.serverTimeoutInMilliseconds = 60000;

  // re-establish the connection if connection dropped
  connection.onclose((error) => {
    console.log(
      "Connection closed due to error. Try refreshing this page to restart the connection",
      error
    );
  });

  connection.onreconnecting((error) => {
    console.log("Connection lost due to error. Reconnecting.", error);
  });

  connection.onreconnected((connectionId) => {
    console.log(
      "Connection reestablished. Connected with connectionId",
      connectionId
    );
  });

  return connection;
};
