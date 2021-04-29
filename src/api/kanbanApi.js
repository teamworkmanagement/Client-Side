import axiosClient from "./axiosClient";

const kanbanApi = {
    getBoardUI(boardId) {
        const url = `/kanbanboard/ui/${boardId}`;
        return axiosClient.get(url);
    },
};

export default kanbanApi;