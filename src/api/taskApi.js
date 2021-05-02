import axiosClient from "./axiosClient";


const taskApi = {
    getTaskById(taskId) {
        const url = `/task/${taskId}`;
        return axiosClient.get(url);
    },
    dragTask(params) {
        const url = `/task/drag-task`;
        return axiosClient.post(url, params);
    },
    /*
    {
  "taskId": "string",
  "taskName": "string",
  "taskDescription": "string",
  "taskPoint": 0,
  "taskCreatedAt": "2021-05-01T09:10:44.542Z",
  "taskStartDate": "2021-05-01T09:10:44.542Z",
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
    }
};

export default taskApi;