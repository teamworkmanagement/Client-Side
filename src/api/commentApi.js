import axiosClient from "./axiosClient";

const commentApi = {
    getAllCommentForPost(postId) {
        const url = `/comment/post/${postId}`;
        return axiosClient.get(url);
    },

    getPagination(params) {
        const url = `/comment?PostId=${params.PostId}&PageSize=${params.PageSize}&SkipItems=${params.SkipItems}`;
        return axiosClient.get(url);
    },
    addComment(params) {
        const url = '/comment';
        return axiosClient.post(url, params);
    },
    getByTask(params) {
        const url = `/comment/bytask`;
        return axiosClient.get(url, params);
    },
    reportComment(payload) {
        const url = '/comment-report';
        return axiosClient.post(url, payload);
    }
};

export default commentApi;