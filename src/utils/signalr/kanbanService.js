import { setupSignalRConnection } from "./signalrConfig";
import store from '../../app/store';
import { signalRAddNewList, signalRAddNewTask, signalRMoveList, signalRMoveTask, signalRRemoveList, signalRRemoveTask, signalRUpdateList, signalRUpdateTask } from "src/features/KanbanBoard/kanbanSlice";




const connection = setupSignalRConnection('https://localhost:9001/hubkanban');
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
    console.log("Move task ", payload);
    store.dispatch(signalRUpdateTask(payload));
})

connection.on("UpdateList", payload => {
    store.dispatch(signalRUpdateList(payload));
})

export const disconnectKanbanService = () => {
    connection.stop();
}