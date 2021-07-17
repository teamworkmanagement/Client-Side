import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './MeetingVideo.scss';
import EzPlayer from '../EzPlayer/EzPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMeeting } from 'src/appSlice';
import meetingApi from 'src/api/meetingApi';
import InviteMembers from '../InviteMembers/InviteMembers';
import NotFoundPage from 'src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage';

MeetingVideo.propTypes = {

};

function MeetingVideo(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const meeting = useSelector(state => state.app.meeting);
    const user = useSelector(state => state.auth.currentUser);

    const [notFound, setNotFound] = useState(false);

    const [showInviteMembers, setShowInviteMembers] = useState(false);

    useEffect(() => {
        if (!meeting)
            setNotFound(true);
    }, [])

    const [locationKeys, setLocationKeys] = useState([])

    const onBackButtonEvent = () => {
        console.log('acccccccccc')
        console.log(history.location.pathname);
        if (meeting) {
            meetingApi.leaveMeeting({
                meetingId: meeting.meetingId,
                userId: user.id,
            }).then(res => {

            }).catch(err => {

            })
            dispatch(setMeeting(null));
        }
    }
    useEffect(() => {
        window.addEventListener("popstate", onBackButtonEvent);

        // return window.removeEventListener("popstate", onBackButtonEvent);
    })

    const onMeetingEnd = () => {
        meetingApi.leaveMeeting({
            meetingId: meeting.meetingId,
            userId: user.id,
        }).then(res => { }).catch(err => { })
        dispatch(setMeeting(null));

        history.goBack();
    }

    const onCLoseModal = () => {
        setShowInviteMembers(false);
    }
    return (
        <div>
            {meeting && (
                <div>
                    <button onClick={() => setShowInviteMembers(true)} className="btn btn-info">Mời thành viên</button>
                    <EzPlayer
                        roomName={meeting.room}
                        displayName={user.fullName}
                        password={meeting.password}
                        onMeetingEnd={() => onMeetingEnd()}
                        loadingComponent={<p>loading ...</p>}
                        errorComponent={<p>Oops, something went wrong</p>} />
                    <InviteMembers
                        meetingId={meeting.meetingId}
                        showInviteMembers={showInviteMembers}
                        onCLoseModal={onCLoseModal} />
                </div>
            )}
            {notFound && <NotFoundPage />}
        </div>
    )
}

export default MeetingVideo;