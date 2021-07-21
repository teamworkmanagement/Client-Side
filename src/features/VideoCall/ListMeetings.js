import React, { useEffect, useState } from "react";
import "./ListMeetings.scss";
import { CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { VscSearchStop } from "react-icons/vsc";
import meetingApi from "src/api/meetingApi";
import CreateMeetingModal from "./Components/CreateMeetingModal/CreateMeetingModal";
import {
  setCreateMeeting,
  setRemoveMeeting,
} from "src/utils/signalr/signalrSlice";
import { setMeeting } from "src/appSlice";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";

ListMeetings.propTypes = {};

function ListMeetings(props) {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [room, setRoom] = useState("gfácdgvsgdfgdfg");
  // eslint-disable-next-line
  const [name, setName] = useState("fgfdgdfgfg");
  // eslint-disable-next-line
  const [call, setCall] = useState(true);

  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const createMeeting = useSelector((state) => state.signalr.createMeeting);
  const removeMeeting = useSelector((state) => state.signalr.removeMeeting);

  const [meetings, setMeetings] = useState([]);
  const [loadone, setLoadDone] = useState(false);

  useEffect(() => {
    meetingApi
      .getMeetings(props.teamId)
      .then((res) => {
        setMeetings(res.data);
      })
      .catch((err) => { })
      .finally(() => {
        setLoadDone(true);
      });
  }, []);

  useEffect(() => {
    if (!createMeeting) return;

    if (createMeeting.teamId === props.teamId) {
      meetingApi
        .getMeetings(props.teamId)
        .then((res) => {
          setMeetings(res.data);
        })
        .catch((err) => { })
        .finally(() => { });
    }
    dispatch(setCreateMeeting(null));
  }, [createMeeting]);

  useEffect(() => {
    if (!removeMeeting) return;

    if (removeMeeting.teamId === props.teamId) {
      meetingApi
        .getMeetings(props.teamId)
        .then((res) => {
          setMeetings(res.data);
        })
        .catch((err) => { })
        .finally(() => { });
    }
    dispatch(setRemoveMeeting(null));
  }, [removeMeeting]);

  // eslint-disable-next-line
  const handleClick = (event) => {
    event.preventDefault();
    if (room && name) setCall(true);
  };

  const goToMeeting = (item) => {
    let i = 0;
    meetingApi
      .checkIsCalling()
      .then((res) => {
        if (res.data === true) {
          dispatch(setMeeting({ userId: user.id, time: Date.now() }));
        } else {
          const newWindow = window.open(
            `/meetingvideo?id=${item.meetingId}&tid=${item.teamId}`,
            "sharer",
            "height=550,width=750"
          );

          newWindow.onunload = function (e) {
            i++;
            console.log(i);
            if (i == 2) {
              meetingApi.leaveMeeting({
                meetingId: item.meetingId,
              }).then(res => { }).catch(err => { })
            }
          }
        }
      })
      .catch((err) => { });
  };

  const onClose = (e) => {
    setShowAddMeeting(false);
    let i = 0;
    console.log("close: ", e);
    if (e) {
      const newWindow = window.open(
        `/meetingvideo?id=${e.meetingId}&tid=${e.teamId}`,
        "sharer",
        "height=550,width=750"
      );

      newWindow.onunload = function (event) {
        i++;
        console.log(i);
        if (i == 2) {
          meetingApi.leaveMeeting({
            meetingId: e.meetingId,
          }).then(res => { }).catch(err => { })
        }
      }
    }
  };

  const onNewMeeting = () => {
    meetingApi
      .checkIsCalling()
      .then((res) => {
        if (res.data === true) {
          dispatch(setMeeting({ userId: user.id, time: Date.now() }));
        } else {
          setShowAddMeeting(true);
        }
      })
      .catch((err) => { });
  };
  return (
    <div className="list-team-boards-container">
      <div className="list-boards-header">
        <div className="other-actions">
          <div onClick={() => onNewMeeting()} className="add-btn add-task-btn">
            <CIcon name="cil-plus" />
            Cuộc họp mới
          </div>
        </div>
      </div>
      <div className="list-meeting">
        <CRow xl={{ cols: 5, gutter: 3 }}>
          {meetings.map((item, index) => {
            return (
              <CCol
                xs="12"
                sm="6"
                md="4"
                xl="3"
                key={index}
                style={{ animationDelay: `${index / 20}s` }}
                className="meeting-item-container"
              >
                <div className="meeting-item">
                  <div className="meeting-title">
                    Cuộc họp:
                    <span className="meeting-name">{item.meetingName}</span>
                  </div>
                  <div className="meeting-user-create-infor">
                    Tạo bởi:
                    <img alt="" src={item.userCreateAvatar} />
                    <div className="team-name">{item.userCreateName}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => goToMeeting(item)}
                      className="join-meeting-btn"
                    >
                      <BiLogInCircle className="icon-join" />
                      Tham gia
                    </button>
                  </div>
                </div>
              </CCol>
            );
          })}
        </CRow>
      </div>
      {meetings.length === 0 && loadone && (
        <div className="nodata-image">
          <div className="icon-group">
            <AiOutlineVideoCamera className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Không có cuộc họp nào đang diễn ra!</div>
        </div>
      )}

      <CreateMeetingModal
        onClose={onClose}
        showAddMeeting={showAddMeeting}
        teamId={props.teamId}
      />
    </div>
  );
}

export default ListMeetings;
