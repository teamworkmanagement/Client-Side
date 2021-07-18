import axiosClient from "./axiosClient";


const meetingApi = {
    getMeetings(teamId) {
        const url = `/meeting/team/${teamId}`;
        return axiosClient.get(url);
    },
    createMeeting(payload) {
        const url = '/meeting';
        return axiosClient.post(url, payload);
    },
    leaveMeeting(payload) {
        const url = '/meeting/leave-meeting';
        return axiosClient.post(url, payload);
    },
    joinMeeting(payload) {
        const url = '/meeting/join-meeting';
        return axiosClient.post(url, payload);
    },
    inviteUsers(payload) {
        const url = '/meeting/invite-meeting';
        return axiosClient.post(url, payload);
    },
    getMeeting(params) {
        const url = `/meeting`;
        return axiosClient.get(url, params);
    },
    checkIsCalling() {
        const url = '/meeting/check-call';
        return axiosClient.get(url);
    }
};

export default meetingApi;