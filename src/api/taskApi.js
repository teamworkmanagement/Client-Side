import axiosClient from "./axiosClient";


const taskApi = {
    getTaskById(taskId) {
        const url = `/task/${taskId}`;
        return axiosClient.get(url);
    },
    dragTask(params) {
        const url = `/task/drag-task`;
        return axiosClient.post(url, params);
    }
};

export default taskApi;