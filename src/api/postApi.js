import axiosClient from "./axiosClient";

const postApi = {
  getAllForUser() {
    const url = "/post/allforuser?userId=8650b7fe-2952-4b03-983c-660dddda9029";
    return axiosClient.get(url);
  },

  getPaginationUser(params) {
    const url = `/post/paging-multi-user`;
    return axiosClient.get(url, params);
  },
  getPaginationTeam(params) {
    const url = `/post/paging-multi-team`;
    return axiosClient.get(url, params);
  },
  reactPost(params) {
    const url = "/post/add-react";
    return axiosClient.post(url, params);
  },
  deleteReactPost(params) {
    const url = "/post/delete-react";
    return axiosClient.delete(url, params);
  },
  addPost(params) {
    const url = "/post";
    return axiosClient.post(url, params);
  },
  postReport(payload) {
    const url = '/post-report';
    return axiosClient.post(url, payload);
  },
  deletePost(postId) {
    const url = `/post/${postId}`;
    return axiosClient.delete(url);
  }
};

export default postApi;
