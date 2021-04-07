import axiosClient from "./axiosClient";

const commentApi = {
    getAllCommentForPost(postId) {
        const url = `/comment/post/${postId}`;
        return axiosClient.get(url);
    },

    getPagination(params) {
        const url = `/comment?PostId=${params.PostId}&PageSize=${params.PageSize}&SkipItems=${params.SkipItems}`;
        return axiosClient.get(url);
    }
};

export default commentApi;