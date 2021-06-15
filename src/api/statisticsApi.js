import axiosClient from "./axiosClient";

const statisticsApi = {
    /**
     * get user task done by filter
     * @param {*} params 
     * @returns 
     */
    getPersonalTaskDone(params) {
        const url = "/statistics/personal-task-done";
        return axiosClient.get(url, params);
    },
    /**
     * get board task done by filter
     * @param {*} params 
     * @returns 
     */
    getBoardTaskDone(params) {
        const url = "/statistics/board-task-done";
        return axiosClient.get(url, params);
    },
    /**
     * get user task done and point in board
     * @param {*} params 
     * @returns
     */
    getUserTaskDoneAndPoint(params) {
        const url = "/statistics/users-task-done-point-board";
        return axiosClient.get(url, params);
    },
    /**
     * get task done in all board of user in dashboard
     * @param {*} params 
     * @returns 
     */
    getUserTaskDoneBoards(params) {
        const url = "/statistics/user-task-done-boards";
        return axiosClient.get(url, params);
    },

    exportPersonalAndTeamStat(payload) {
        const url = '/statistics/export-personalandteam';
        return axiosClient.post(url, payload, {
            responseType: 'blob',
        });
    },

    exportTeamDoneBoard(payload) {
        const url = '/statistics/export-teamdoneboard';
        return axiosClient.post(url, payload, {
            responseType: 'blob',
        });
    }
    ,
    exportTeamUserPointTask(payload) {
        const url = '/statistics/export-pointtask-groupbyuser';
        return axiosClient.post(url, payload, {
            responseType: 'blob',
        });
    }
};

export default statisticsApi;
