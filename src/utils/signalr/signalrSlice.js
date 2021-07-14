import { createSlice } from "@reduxjs/toolkit";
const signalrSlice = createSlice({
    name: "signalr",
    initialState: {
        newAddReact: null,
        removeReact: null,
        newComment: null,
        updateTeamInfo: null,
        leaveTeam: null,
        joinTeam: null,
    },
    reducers: {
        setNewAddReact(state, action) {
            if ((window.location.pathname.includes('newsfeed') ||
                window.location.search.includes('tab=feed')
                || window.location.search.includes('b=')) && action.payload) {
                state.newAddReact = action.payload;
            } else {
                state.newAddReact = null;
            }
        },
        setRemoveReact(state, action) {
            if ((window.location.pathname.includes('newsfeed') ||
                window.location.search.includes('tab=feed')
                || window.location.search.includes('b=')) && action.payload) {
                state.removeReact = action.payload;
            } else {
                state.removeReact = null;
            }
        },
        setNewComment(state, action) {
            if ((window.location.pathname.includes('newsfeed') ||
                window.location.search.includes('tab=feed')
                || window.location.search.includes('b=')) && action.payload) {
                state.newComment = action.payload;
            } else {
                state.newComment = null;
            }

        },
        setUpdateTeamInfo(state, action) {
            if (window.location.pathname.includes('team') && action.payload) {
                state.updateTeamInfo = action.payload;
            }
            else {
                state.updateTeamInfo = null;
            }
        },
        setLeaveTeam(state, action) {
            if (window.location.pathname.includes('team') && action.payload) {
                state.leaveTeam = action.payload;
            }
            else {
                state.leaveTeam = null;
            }
        },
        setJoinTeam(state, action) {
            if (window.location.pathname.includes('team') && action.payload) {
                state.joinTeam = action.payload;
            }
            else {
                state.joinTeam = null;
            }
        }
    },
});

const { actions, reducer } = signalrSlice;
export const {
    setNewAddReact,
    setRemoveReact,
    setNewComment,
    setUpdateTeamInfo,
    setLeaveTeam,
    setJoinTeam
} = actions;
export default reducer;
