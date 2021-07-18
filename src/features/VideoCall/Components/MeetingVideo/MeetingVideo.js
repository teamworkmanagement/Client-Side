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
import queryString from 'query-string';
import { connection } from 'src/utils/signalr/appService';


MeetingVideo.propTypes = {

};

function MeetingVideo(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [meeting, setMeeting] = useState(null);
    const [meetingEnd, setMeetingEnd] = useState(false);
    const user = useSelector(state => state.auth.currentUser);

    const [notFound, setNotFound] = useState(false);

    const [showInviteMembers, setShowInviteMembers] = useState(false);

    useEffect(() => {
        /*const queryObj = queryString.parse(history.location.search);
        if (!queryObj.id || !queryObj.tid) {
            setNotFound(true);
            return;
        }

        const params = {
            meetingId: queryObj.id,
            teamId: queryObj.tid
        }

        meetingApi.getMeeting({ params })
            .then(resMeet => {
                meetingApi.joinMeeting({
                    meetingId: resMeet.data.meetingId,
                    userConnectionId: connection.connectionId,
                }).then(res => {
                    if (!res.succeeded)
                        alert('already join');
                    else {
                        setMeeting(resMeet.data);
                    }
                }).catch(err => {
                    setNotFound(true);
                })
            })
            .catch(err => {
                setNotFound(true);
            })*/

        console.log('a ', connection);
        console.log('b ' + connection.connectionId);

    }, [history.location.search])

    useEffect(() => {
        console.log('c ', connection);
        console.log('d ' + connection.connectionId);
    }, [connection])

    const onMeetingEnd = () => {
        setMeeting(null);
        setMeetingEnd(true);
        meetingApi.leaveMeeting({
            meetingId: meeting.meetingId,
            userId: user.id,
        }).then(res => { }).catch(err => { })
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
                        roomName={meeting.meetingName}
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
            {meetingEnd && <div>Buổi họp đã kết thúc!</div>}
            {notFound && <NotFoundPage />}
        </div>
    )
}

export default MeetingVideo;
