import axiosClient from "./axiosClient";

const kanbanApi = {
    getBoardUI(boardId) {
        const url = `/kanbanboard/ui/${boardId}`;
        return axiosClient.get(url);
    },
    swapList(params) {
        const url = '/kanbanboard/swap-list';
        return axiosClient.post(url, params);
    }
};

export default kanbanApi;