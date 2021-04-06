import axiosClient from "./axiosClient";

const commentApi = {
    getAllCommentForPost(postId) {
        const url = `/comment/post/${postId}`;
        return axiosClient.get(url);
    },
};

export default commentApi;