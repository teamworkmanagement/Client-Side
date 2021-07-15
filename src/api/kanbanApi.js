import axiosClient from "./axiosClient";

const kanbanApi = {
    getBoardUI(params) {
        const url = `/kanbanboard/ui`;
        return axiosClient.get(url, params);
    },
    swapList(params) {
        const url = '/kanbanboard/swap-list';
        return axiosClient.post(url, params);
    },
    getAllKanbanForTeam(teamId) {
        const url = `/kanbanboard/teamboards/${teamId}`;
        return axiosClient.get(url);
    },
    addBoard(payload) {
        const url = `/kanbanboard`;
        return axiosClient.post(url, payload);
    },
    addList(payload) {
        const url = `/kanbanlist`;
        return axiosClient.post(url, payload);
    },
    removeKanbanList(params) {
        const url = `/kanbanlist`;
        return axiosClient.delete(url, params);
    },
    getBoardsForUser(userId) {
        const url = `/kanbanboard/user-boards/${userId}`;
        return axiosClient.get(url);
    },
    getBoardsForUserTeams(userId) {
        const url = `/kanbanboard/team-boards/${userId}`;
        return axiosClient.get(url);
    },
    renameKanbanList(payload) {
        const url = '/kanbanlist/name-list';
        return axiosClient.patch(url, payload);
    },
    searchKanbanBoards(params) {
        const url = '/kanbanboard/search-boards';
        return axiosClient.get(url, params);
    },
    rebalanceTask(payload) {
        const url = '/kanbanboard/rebalance-task';
        return axiosClient.post(url, payload);
    },
    rebalanceList(payload) {
        const url = '/kanbanboard/rebalance-list';
        return axiosClient.post(url, payload);
    }
};

export default kanbanApi;