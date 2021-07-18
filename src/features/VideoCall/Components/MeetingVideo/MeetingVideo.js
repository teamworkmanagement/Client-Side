import React, { useEffect, useState } from "react";

import "./MeetingVideo.scss";
import EzPlayer from "../EzPlayer/EzPlayer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import meetingApi from "src/api/meetingApi";
import InviteMembers from "../InviteMembers/InviteMembers";
import NotFoundPage from "src/shared_components/MySharedComponents/NotFoundPage/NotFoundPage";
import queryString from "query-string";
import { connection } from "src/utils/signalr/appService";

function MeetingVideo(props) {
  const history = useHistory();
  const [meeting, setMeeting] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [meetingEnd, setMeetingEnd] = useState(false);
  const user = useSelector((state) => state.auth.currentUser);

  const [notFound, setNotFound] = useState(false);

  const [showInviteMembers, setShowInviteMembers] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log("a ", connection);
      console.log("b " + connection.connectionId);

      const queryObj = queryString.parse(history.location.search);
      if (!queryObj.id || !queryObj.tid) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const params = {
        meetingId: queryObj.id,
        teamId: queryObj.tid,
      };
      meetingApi
        .getMeeting({ params })
        .then((resMeet) => {
          meetingApi
            .joinMeeting({
              meetingId: resMeet.data.meetingId,
              userConnectionId: connection.connectionId,
            })
            .then((res) => {
              if (!res.succeeded) alert("already join");
              else {
                setMeeting(resMeet.data);
              }
            })
            .catch((err) => {
              setLoading(false);
              setNotFound(true);
            });
        })
        .catch((err) => {
          setLoading(false);
          setNotFound(true);
        });

      setLoading(false);
    }, 1500);
  }, [history.location.search]);

  useEffect(() => {
    console.log("c ", connection);
    console.log("d " + connection.connectionId);
  }, [connection]);

  const onMeetingEnd = () => {
    setMeeting(null);
    setMeetingEnd(true);
    window.close();
    meetingApi
      .leaveMeeting({
        meetingId: meeting.meetingId,
        userId: user.id,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const onCLoseModal = () => {
    setShowInviteMembers(false);
  };

  return (
    <div>
      {meeting && (
        <div>
          <button
            onClick={() => setShowInviteMembers(true)}
            className="btn btn-info"
          >
            Mời thành viên
          </button>
          <EzPlayer
            subject={meeting.meetingName}
            roomName={meeting.meetingId}
            displayName={user.fullName}
            password={meeting.password}
            onMeetingEnd={() => onMeetingEnd()}
            loadingComponent={<p>loading ...</p>}
            errorComponent={<p>Oops, something went wrong</p>}
          />
          <InviteMembers
            meetingId={meeting.meetingId}
            showInviteMembers={showInviteMembers}
            onCLoseModal={onCLoseModal}
          />
        </div>
      )}
      {meetingEnd && <div>Buổi họp đã kết thúc!</div>}
      {notFound && <NotFoundPage />}
    </div>
  );
}

export default MeetingVideo;
