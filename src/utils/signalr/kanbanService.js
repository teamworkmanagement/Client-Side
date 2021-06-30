import { setupSignalRConnection, startSignalRConnection } from "./signalrConfig";
import store from '../../app/store';

import { reAssignUser, signalRAddFile, signalRAddNewList, signalRAddNewTask, signalRChangeNameList, signalRMoveList, signalRMoveTask, signalRRemoveList, signalRRemoveTask, signalRUpdateList, signalRUpdateTask } from "src/features/KanbanBoard/kanbanSlice";

import {SIGNALR_URL} from "../../env";




export const connection = setupSignalRConnection(`${SIGNALR_URL}/hubkanban`);


connection.on("AddNewTask", payload => {
    console.log("add new card ", payload);
    store.dispatch(signalRAddNewTask(payload));
})

connection.on("AddNewList", payload => {
    console.log("add new list ", payload);
    store.dispatch(signalRAddNewList(payload));
})

connection.on("RemoveTask", payload => {
    console.log("remove task ", payload);
    store.dispatch(signalRRemoveTask(payload));
})

connection.on("RemoveList", payload => {
    console.log("remove list ", payload);
    store.dispatch(signalRRemoveList(payload));
})

connection.on("MoveTask", payload => {
    console.log("move task ", payload);
    store.dispatch(signalRMoveTask(payload));
})

connection.on("MoveList", payload => {
    console.log("Move list ", payload);
    store.dispatch(signalRMoveList(payload));
})

connection.on("UpdateTask", payload => {
    console.log("Update task ", payload);
    store.dispatch(signalRUpdateTask(payload));
})

connection.on("UpdateList", payload => {
    store.dispatch(signalRUpdateList(payload));
})

connection.on("ReAssignUser", payload => {
    console.log("reassign: ", payload);
    store.dispatch(reAssignUser(payload));
})

connection.on("RenameList", payload => {
    console.log("change name list: ", payload);
    store.dispatch(signalRChangeNameList(payload));
})

connection.on("AddFile", payload => {
    console.log("Add file: ", payload);
    store.dispatch(signalRAddFile(payload));
})

export const startKanbanService = () => {
    if (connection.state == 'Disconnected') {
        startSignalRConnection(connection);
    }
}


export const disconnectKanbanService = () => {
    connection.stop();
}