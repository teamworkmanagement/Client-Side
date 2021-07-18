import React, { useEffect, useState } from "react";
import "./ListMeetings.scss";
import { CCol, CInput, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { VscSearchStop } from "react-icons/vsc";
import { useHistory, useParams } from "react-router-dom";
import meetingApi from "src/api/meetingApi";
import CreateMeetingModal from "./Components/CreateMeetingModal/CreateMeetingModal";
import { setCreateMeeting, setRemoveMeeting } from "src/utils/signalr/signalrSlice";
import { setMeeting } from "src/appSlice";
import { connection } from "src/utils/signalr/appService";


ListMeetings.propTypes = {

};

function ListMeetings(props) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState('gfácdgvsgdfgdfg');
    const [name, setName] = useState('fgfdgdfgfg');
    const [call, setCall] = useState(true);
    const [password, setPassword] = useState('');

    const [showAddMeeting, setShowAddMeeting] = useState(false);
    const user = useSelector((state) => state.auth.currentUser);
    const createMeeting = useSelector(state => state.signalr.createMeeting);
    const removeMeeting = useSelector(state => state.signalr.removeMeeting);

    const [meetings, setMeetings] = useState([]);
    const [loadone, setLoadDone] = useState(false);
    const { teamId } = useParams();

    const history = useHistory();

    useEffect(() => {
        meetingApi.getMeetings(props.teamId)
            .then(res => {
                setMeetings(res.data);
            })
            .catch(err => {

            })
            .finally(() => {
                setLoadDone(true);
            })
    }, [])

    useEffect(() => {
        if (!createMeeting)
            return;

        if (createMeeting.teamId == props.teamId) {
            meetingApi.getMeetings(props.teamId)
                .then(res => {
                    setMeetings(res.data);
                })
                .catch(err => {

                })
                .finally(() => {

                })
        }
        dispatch(setCreateMeeting(null));
    }, [createMeeting])

    useEffect(() => {
        if (!removeMeeting)
            return;

        if (removeMeeting.teamId == props.teamId) {
            meetingApi.getMeetings(props.teamId)
                .then(res => {
                    setMeetings(res.data);
                })
                .catch(err => {

                })
                .finally(() => {

                })
        }
        dispatch(setRemoveMeeting(null));
    }, [removeMeeting])

    const handleClick = event => {
        event.preventDefault()
        if (room && name) setCall(true)
    }

    const goToMeeting = (item) => {
        meetingApi.checkIsCalling()
            .then(res => {

                if (res.data === true) {
                    dispatch(setMeeting({ userId: user.id, time: Date.now() }));
                }
                else {
                    window.open(`/meetingvideo?id=${item.meetingId}&tid=${item.teamId}`, 'sharer', 'height=550,width=750');
                }
            }).catch(err => {

            })

    }

    const onClose = (e) => {
        setShowAddMeeting(false);
        console.log('close: ', e);
        if (e) {
            window.open(`/meetingvideo?id=${e.meetingId}&tid=${e.teamId}`, 'sharer', 'height=550,width=750');
        }
    }

    const onNewMeeting = () => {
        meetingApi.checkIsCalling()
            .then(res => {

                if (res.data === true) {
                    dispatch(setMeeting({ userId: user.id, time: Date.now() }));
                }
                else {
                    setShowAddMeeting(true);
                }
            }).catch(err => {

            })
    }
    return (<div className="list-team-boards-container">
        <div className="list-boards-header">
            <div className="other-actions">
                <div
                    onClick={() => onNewMeeting()}
                    className="add-btn add-task-btn"
                >
                    <CIcon name="cil-plus" />
                    Cuộc họp mới
                </div>
            </div>
        </div>
        <div className="list-boards">
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
                            className="board-item-container"
                        >
                            <div className="board-item">
                                <div className="board-title">{item.meetingName}</div>
                                <div className="board-team-infor">
                                    Bởi:
                                    <img alt="" src={item.userCreateAvatar} />
                                    <div className="team-name">{item.userCreateName}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => goToMeeting(item)}
                                        className="btn btn-info"
                                    >
                                        <CIcon name="cil-plus" />
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
                    <BsClipboardData className="icon-task" />
                    <VscSearchStop className="icon-search" />
                </div>

                <div className="noti-infor">Không có cuộc họp nào đang diễn ra!</div>
            </div>
        )}

        <CreateMeetingModal
            onClose={onClose}
            showAddMeeting={showAddMeeting}
            teamId={props.teamId} />
    </div>);
}

export default ListMeetings;