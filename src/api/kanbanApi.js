import axiosClient from "./axiosClient";

const kanbanApi = {
    getBoardUI(boardId) {
        const url = `/kanbanboard/ui/${boardId}`;
        return axiosClient.get(url);
    },
    swapList(params) {
        const url = '/kanbanboard/swap-list';
        return axiosClient.post(url, params);
    },
    getAllKanbanForTeam(teamId) {
        const url = `/kanbanboard/team-boards/${teamId}`;
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
    removeKanbanList(kanbanListId) {
        const url = `/kanbanlist/${kanbanListId}`;
        return axiosClient.delete(url);
    }
};

export default kanbanApi;