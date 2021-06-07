import axiosClient from "./axiosClient";


const taskApi = {
    dragTask(params) {
        const url = `/task/drag-task`;
        return axiosClient.post(url, params);
    },
    getTaskByBoard(params) {
        const url = '/task/boardtask';
        return axiosClient.get(url, params);
    },
    /*
    {
  "taskId": "string",
  "taskName": "string",
  "taskDescription": "string",
  "taskPoint": 0,
  "taskCreatedAt": "2021-05-01T09:10:44.542Z",
  "taskDeadline": "2021-05-01T09:10:44.542Z",
  "taskStatus": "string",
  "taskCompletedPercent": 0,
  "taskTeamId": "string",
  "taskIsDeleted": true,
  "taskBelongedId": "string",
  "taskOrderInList": 0,
  "taskThemeColor": "string",
  "taskImageUrl": "string"
} */

    addNewTask(params) {
        const url = '/task';
        return axiosClient.post(url, params);
    },
    updateTask(params) {
        const url = '/task';
        return axiosClient.put(url, params);
    },
    removeTask(params) {
        const url = `/task/${params}`;
        return axiosClient.delete(url);
    },
    addHandleTask(params) {
        const url = '/handletask';
        return axiosClient.post(url, params);
    },
    reAssignTask(params) {
        const url = '/handletask/reassign-task';
        return axiosClient.post(url, params);
    }
};

export default taskApi;