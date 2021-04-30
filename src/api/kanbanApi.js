import axiosClient from "./axiosClient";

const kanbanApi = {
    getBoardUI(boardId) {
        const url = `/kanbanboard/ui/${boardId}`;
        return axiosClient.get(url);
    },
    swapList(parmas) {
        const url = '/kanbanboard/swap-list';
        return axiosClient.post(url, parmas);
    }
};

export default kanbanApi;