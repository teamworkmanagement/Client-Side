import axiosClient from "./axiosClient";


const taskApi = {
    getTaskById(taskId) {
        const url = `/task/${taskId}`;
        return axiosClient.get(url);
    },
};

export default taskApi;