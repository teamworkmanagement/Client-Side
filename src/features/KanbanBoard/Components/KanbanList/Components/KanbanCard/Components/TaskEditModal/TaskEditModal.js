import React, { useEffect, useRef, useState } from "react";
import "./TaskEditModal.scss";
import CIcon from "@coreui/icons-react";
import { Range, getTrackBackground } from "react-range";
import { Popover } from "react-tiny-popover";

import {
  CCol,
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CTooltip,
} from "@coreui/react";
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setViewHistory } from "src/appSlice";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import CommentItem from "src/features/NewsFeedPage/Components/Post/Components/CommentItem/CommentItem";
import { GetFileTypeImage, GetTypeFromExt } from "src/utils/file/index";
import taskApi from "src/api/taskApi";
import { myBucket } from "src/utils/aws/config";
import { v4 as uuidv4 } from "uuid";
import fileApi from "src/api/fileApi";
import commentApi from "src/api/commentApi";
import Select, { components } from "react-select";
import userApi from "src/api/userApi";
import { BsArrowsMove } from "react-icons/bs";
import { GrDocumentTime } from "react-icons/gr";
import TaskCommentInput from "./TaskCommentInput";
import { convertToRaw } from "draft-js";
import Loading from "src/shared_components/MySharedComponents/Loading/Loading";
import { FindNextRank, genNewRank } from "src/utils/lexorank/lexorank";

const ValueOption = (props) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", marginTop: "auto", marginBottom: "auto" }}>
      <img src={props.data.img} style={{ width: 30 }} alt="" />
      <span style={{ marginTop: "auto", marginBottom: "auto" }}>
        {props.data.label}
      </span>
    </div>
  </components.SingleValue>
);

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          marginBottom: "auto",
          justifyContent: "space-between",
        }}
      >
        <img alt="" height={20} width={20} src={props.data.img} />
        <label>{props.data.label}</label>
      </div>
    </components.Option>
  );
};

const colorPalette = [
  "#1CCE67",
  "#01DCE9",
  "#FF6263",
  "#FFCC12",
  "#EA90EE",
  "#FF8E50",
  "#63B4FF",
  "#9F63FF",
];

function TaskEditModal(props) {
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const fileRef = useRef(null);
  const pop1 = useRef();
  const pop2 = useRef();

  const newComment = useSelector((state) => state.signalr.newComment);
  const user = useSelector((state) => state.auth.currentUser);
  const curUser = useSelector((state) => state.auth.currentUser);
  const adminAction = useSelector((state) => state.kanban.adminAction);
  const kanbanLists = useSelector(
    (state) => state.kanban.kanbanBoard.kanbanLists
  );
  const signalRAddFile = useSelector(
    (state) => state.kanban.signalrData.addNewFile
  );
  const currentBoard = useSelector(
    (state) => state.kanban.kanbanBoard.currentBoard
  );

  const [finalColor, changeColor] = useState(null);
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [taskNameEditing, setTaskNameEditing] = useState(false);
  const [taskDescriptionEditing, setTaskDescriptionEditing] = useState(false);
  const [task, setTask] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [value, setValue] = useState(null);
  const [renderedValue, setRenderedValue] = useState([0]);
  //eslint-disable-next-line
  const [updateTaskRequest, setUpdateTaskRequest] = useState(null);
  const [cmtLists, setCmtLists] = useState([]);
  const [attachments, setAttachments] = useState([]);
  //eslint-disable-next-line
  const [triggerUpdateTask, setTriggerUpdateTask] = useState(-1); //cause setState is asynchonous action
  const [kanbanLocal, setKanbanLocal] = useState([]);
  const [listScores, setListScores] = useState([
    {
      score: "0",
      active: true,
    },
    {
      score: "1",
      active: false,
    },
    {
      score: "2",
      active: false,
    },
    {
      score: "3",
      active: false,
    },
    {
      score: "4",
      active: false,
    },
    {
      score: "5",
      active: false,
    },
    {
      score: "6",
      active: false,
    },
    {
      score: "7",
      active: false,
    },
    {
      score: "8",
      active: false,
    },
    {
      score: "9",
      active: false,
    },
    {
      score: "10",
      active: false,
    },
  ]);
  const [current, setCurrent] = useState(null);
  const [openPopoverLists, setOpenPopoverLists] = useState(false);
  const [openPopoverScores, setOpenPopoverScores] = useState(false);
  //eslint-disable-next-line
  const [inputValue, setInputValue] = useState("");
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    if (kanbanLists.length === 0) return;
    var cloneLists = [...kanbanLists];

    console.log(cloneLists);
    console.log(task);
    for (let i = 0; i < cloneLists.length; i++) {
      cloneLists[i] = {
        ...cloneLists[i],
        active: false,
      };
    }
    setKanbanLocal(cloneLists);
  }, [kanbanLists]);

  useEffect(() => {
    if (signalRAddFile && signalRAddFile.fileTaskOwnerId === task.taskId) {
      const cloneAttachs = [...attachments];
      cloneAttachs.splice(0, 0, { ...signalRAddFile });
      setAttachments(cloneAttachs);
    }
  }, [signalRAddFile]);

  useEffect(() => {
    if (props.data) {
      if (props.data.userId) {
        console.log("set current 2:");
        console.log(props.data.userName);
        setCurrent({
          value: props.data.userId,
          label: props.data.userName,
          img: props.data.userAvatar,
        });
        console.log(current);
      }
      setTask({ ...props.data });
      changeColor(
        props.data.taskThemeColor ? props.data.taskThemeColor : "ffffff"
      );
      setValue(props.data.taskCompletedPercent);
      setRenderedValue([props.data.taskCompletedPercent]);
      if (props.data.comments) setCmtLists(props.data.comments);

      if (props.data.files) setAttachments(props.data.files);

      const index = kanbanLists.findIndex(
        (x) => x.kanbanListId === props.data.kanbanListId
      );
      //set active cho list đang chứa task này
      const localClone = [...kanbanLocal];

      for (let i = 0; i < localClone.length; i++) {
        localClone[i] = {
          ...localClone[i],
          active: false,
        };
      }
      localClone[index] = {
        ...localClone[index],
        active: true,
      };

      setKanbanLocal(localClone);

      console.log(props.data.taskPoint);
      if (props.data.taskPoint !== undefined && props.data.taskPoint !== null) {
        const indexScore = listScores.findIndex(
          (x) => x.score === props.data.taskPoint
        );
        //set active cho list đang chứa task này

        const scoreClone = [...listScores];

        console.log("cloneeeeee: ", scoreClone);
        console.log("index lafL : ", indexScore);

        for (let i = 0; i < scoreClone.length; i++) {
          scoreClone[i] = {
            ...scoreClone[i],
            active: false,
          };

          if (i === indexScore) {
            scoreClone[i] = {
              ...scoreClone[i],
              active: true,
            };
          }
        }

        setListScores(scoreClone);
      }
    } else {
      setTask({});
      setCurrent(null);
    }
  }, [props.data]);

  useEffect(() => {
    if (JSON.stringify(task) === JSON.stringify({})) return;
    if (!props.data) return;
    let payload = {};
    if (current === null) {
      payload = {
        taskId: props.data.taskId,
        currentUserId: null,
      };
    } else {
      payload = {
        taskId: props.data.taskId,
        currentUserId: current.value,
      };
    }

    taskApi
      .reAssignTask(payload)
      .then((res) => {
        console.log("số lần call api");
      })
      .catch((err) => {});
  }, [current]);

  useEffect(() => {
    if (updateTaskRequest) {
    }
  }, [updateTaskRequest]);

  useEffect(() => {
    if (triggerUpdateTask < 0) return;

    if (props.updateGanttTask) {
      props.updateGanttTask(task);
    }
  }, [triggerUpdateTask]);

  useEffect(() => {
    if (!newComment || !props.data) return;
    if (newComment.commentTaskId === props.data.taskId) {
      setCmtLists([newComment].concat([...cmtLists]));
    }
  }, [newComment]);

  useEffect(() => {
    console.log(props.data);
    if (props.data) {
      try {
        async function getAllMembers() {
          const params = {
            boardId: currentBoard,
            keyword: inputValue,
          };
          console.log(currentBoard);
          const res = await userApi.searchUsersKanban({ params });

          const listUsers = res.data?.map((x) => {
            return {
              value: x.userId,
              label: x.userFullname,
              img: x.userImageUrl,
            };
          });
          setMemberList(listUsers);
          console.log(listUsers);
          //return listUsers;
        }

        getAllMembers();
      } catch (e) {}
    }
  }, [props.data]);

  const onChange = (e) => {
    setCurrent(e);
  };

  const dispatchUpdateTask = (obj) => {
    const { name, value } = obj;
    const {
      taskId,
      taskDescription,
      taskThemeColor,
      taskStartDate,
      taskStatus,
      taskCompletedPercent,
      taskImageUrl,
      taskDeadline,
      taskPoint,
    } = task;
    const updateObj = {
      taskId,
      taskDescription,
      taskThemeColor,
      taskStartDate,
      taskStatus,
      taskCompletedPercent,
      taskImageUrl,
      taskDeadline,
      taskPoint,
    };
    const newUpdateObj = {
      ...updateObj,
      [name]: value,
      userActionId: curUser.id,
    };

    taskApi
      .updateTask(newUpdateObj)
      .then((res) => {})
      .catch((err) => {});
  };

  function handleClose() {
    if (props.closePopup) {
      props.closePopup();
    }
  }

  // function handleKeyDown(e) {
  //   const limit = 80;

  //   e.target.style.height = `${e.target.scrollHeight}px`;
  //   // In case you have a limitation
  //   e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  // }

  function handleInputNameAndDes(e) {
    const { name, value } = e.target;
    if (name === "taskName") setTaskNameEditing(true);
    else setTaskDescriptionEditing(true);

    setTask({
      ...task,
      [name]: value,
    });
  }

  function onSaveTaskName() {
    if (
      task.taskName === "" ||
      task.taskName === undefined ||
      task.taskName === null
    ) {
      return;
    }

    dispatchUpdateTask({
      name: "taskName",
      value: task.taskName,
    });
    setTaskNameEditing(false);
  }

  function onSaveTaskDescription() {
    if (task.taskDescription === "") {
      return;
    }

    dispatchUpdateTask({
      name: "taskDescription",
      value: task.taskDescription,
    });
    setTaskDescriptionEditing(false);
  }

  function onChangeDeadline(e) {
    const dateParts = e.target.value.split("-");
    //const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    const newDate = new Date(
      Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
    );

    setTask({
      ...task,
      taskDeadline: newDate,
    });
    dispatchUpdateTask({
      name: "taskDeadline",
      value: newDate,
    });
  }
  function onChangeStartDate(e) {
    const dateParts = e.target.value.split("-");
    const newDate = new Date(
      Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2])
    );

    setTask({
      ...task,
      taskStartDate: newDate,
    });
    dispatchUpdateTask({
      name: "taskStartDate",
      value: newDate,
    });
  }

  function getStatusText() {
    switch (task.taskStatus) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      case "done":
        return "Hoàn thành";
      default:
        return "Đang chờ";
    }
  }

  const TODO_COLOR = "#FF5454";
  const DOING_COLOR = "#EE8434";
  const DONE_COLOR = "#2ABB7D";
  const TODO_BACKGROUNDCOLOR = "#FBEAEA";
  const DOING_BACKGROUNDCOLOR = "#FEF5EE";
  const DONE_BACKGROUNDCOLOR = "#ECF5EA";

  function getStatusBackgroundColor() {
    switch (task.taskStatus) {
      case "todo":
        return TODO_BACKGROUNDCOLOR;
      case "doing":
        return DOING_BACKGROUNDCOLOR;
      default:
        return DONE_BACKGROUNDCOLOR;
    }
  }

  function getStatusColor() {
    switch (task.taskStatus) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
    }
  }

  function getStatusColorFormText(status) {
    switch (status) {
      case "todo":
        return TODO_COLOR;
      case "doing":
        return DOING_COLOR;
      default:
        return DONE_COLOR;
    }
  }

  function onChooseStatus(e) {
    const newStatus = e.target.classList[0];
    let status = "";
    switch (newStatus) {
      case "todo-status":
        status = "todo";
        break;
      case "doing-status":
        status = "doing";
        break;
      default:
        status = "done";
        break;
    }

    setTask({
      ...task,
      taskStatus: status,
    });
    dispatchUpdateTask({
      name: "taskStatus",
      value: status,
    });
  }

  function onButtonThemeClicked(e) {
    if (e.target.className.animVal === "c-icon") {
      return;
    }
    setIsShowColorPicker(!isShowColorPicker);
  }

  function onButtonThemeBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsShowColorPicker(false);
    }
  }

  function onChangeColorTask(colore) {
    changeColor(colore.hex);
    setTask({
      ...task,
      taskThemeColor: colore.hex,
    });
    dispatchUpdateTask({
      name: "taskThemeColor",
      value: colore.hex,
    });
  }

  function onDeleteThemeTask() {
    setTask({
      ...task,
      taskThemeColor: "",
    });
    dispatchUpdateTask({
      name: "taskThemeColor",
      value: "",
    });
  }

  function handleUpdateTask(value) {
    setTask({
      ...task,
      taskCompletedPercent: value,
    });
    dispatchUpdateTask({
      name: "taskCompletedPercent",
      value: value,
    });
  }

  function getColorFromValue() {
    if (renderedValue < 26) {
      return "#E55353";
    }
    if (renderedValue < 51) {
      return "#F9B116";
    }
    if (renderedValue < 76) {
      return "#3499FF";
    }
    return "#2FB85D";
  }

  const onDeleteTaskAvatar = () => {
    setTask({
      ...task,
      taskImageUrl: value,
    });
    dispatchUpdateTask({
      name: "taskImageUrl",
      value: null,
    });
  };

  const onPickImage = () => {
    imageRef.current.click();
  };

  const onImagePickChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const folder = uuidv4();
      const params = {
        Body: file,
        Bucket: "teamappstorage",
        Key: `${folder}/${file.name}`,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          if (pro >= 100) {
            const imageUrl = `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`;
            setTask({
              ...task,
              taskImageUrl: imageUrl,
            });

            dispatchUpdateTask({
              name: "taskImageUrl",
              value: imageUrl,
            });
          }
        })
        .send((err) => {});
    }
  };

  const onFilePickChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const folder = uuidv4();
      const params = {
        Body: file,
        Bucket: "teamappstorage",
        Key: `${folder}/${file.name}`,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          if (pro >= 100) {
            const fileUrl = `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`;
            setTask({
              ...task,
              filesCount: task.filesCount + 1,
            });

            const body = {
              fileName: file.name,
              fileUrl: fileUrl,
              fileType: GetTypeFromExt(file.name),
              fileUserUploadId: curUser.id,
              fileTaskOwnerId: task.taskId,
              fileSize: file.size,
            };

            fileApi
              .addFile(body)
              .then((res) => {})
              .catch((err) => {});
          }
        })
        .send((err) => {});
    }
  };

  const onPickFile = () => {
    fileRef.current.click();
  };

  const seeMoreComments = async () => {
    const params = {
      taskId: task.taskId,
      skipItems: cmtLists.length,
    };
    const res = await commentApi.getByTask({ params });
    const cloneCmtList = [...cmtLists];
    const newCmts = cloneCmtList.concat(res.data);
    setCmtLists(newCmts);
  };

  const onRemoveTask = () => {
    const confirmBox = window.confirm("Bạn có chắc chắn muốn xóa task?");
    if (confirmBox !== true) {
      return;
    }

    taskApi
      .removeTask(task.taskId)
      .then((res) => {})
      .catch((err) => {});

    if (props.closePopup) {
      props.closePopup();
    }
  };

  function selectList(index) {
    var cloneLists = [...kanbanLocal];
    for (let i = 0; i < cloneLists.length; i++) {
      cloneLists[i] = {
        ...cloneLists[i],
        active: false,
      };
      if (i === index) {
        cloneLists[i] = {
          ...cloneLists[i],
          active: true,
        };
      }
    }
    setKanbanLocal(cloneLists);
  }

  const changeListClick = (index) => {
    const localObjIndex = kanbanLocal.findIndex((kl) => kl.active);

    if (localObjIndex === index) {
      alert("errror");
      return;
    }

    const newList = kanbanLocal[index];

    let pos = -9999;
    if (newList.taskUIKanbans.length === 0) {
      pos = genNewRank();
    } else {
      pos = FindNextRank(
        newList.taskUIKanbans[newList.taskUIKanbans.length - 1].taskRankInList
      );
    }

    taskApi
      .dragTask({
        taskId: task.taskId,
        position: pos,
        oldList: kanbanLocal[localObjIndex].kanbanListId,
        newList: newList.kanbanListId,
        boardId: currentBoard,
      })
      .then((res) => {})
      .catch((err) => {});

    selectList(index);
  };

  function renderContentList() {
    return (
      <div className="lists-popover-container">
        <div className="lists-header">Danh sách</div>
        <div className="lists-body">
          {kanbanLocal.map((list, index) => {
            return (
              <div
                className={`list-item ${list.active ? "active" : ""}`}
                onClick={() => changeListClick(index)}
              >
                <CIcon name="cil-check-alt" />
                <div>{list.kanbanListTitle}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function selectScore(index) {
    var cloneLists = [...listScores];
    for (let i = 0; i < cloneLists.length; i++) {
      cloneLists[i] = {
        ...cloneLists[i],
        active: false,
      };
      if (i === index) {
        cloneLists[i] = {
          ...cloneLists[i],
          active: true,
        };
      }
    }
    setListScores(cloneLists);

    setTask({
      ...task,
      taskPoint: index + "",
    });

    dispatchUpdateTask({
      name: "taskPoint",
      value: index,
    });
  }

  function renderContentScore() {
    return (
      <div className="scores-popover-container">
        <div className="scores-body">
          {listScores.map((item, index) => {
            return (
              <div
                className={`score-item ${item.active ? "active" : ""}`}
                onClick={() => selectScore(index)}
              >
                <CIcon name="cil-check-alt" />
                <div>{item.score}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
  };

  const saveContent = (editorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    if (blocks.length === 1) {
      if (blocks[0].text === "") return;
    }
    const cloneBlocks = [...blocks];
    //tags
    const obj = convertToRaw(editorState.getCurrentContent());
    const mentions = [];
    const entityMap = obj.entityMap;

    for (const property in entityMap) {
      if (entityMap[property].type === "mention")
        mentions.push(entityMap[property].data.mention);
    }

    cloneBlocks.forEach((block, index) => {
      if (block.entityRanges.length > 0) {
        block.entityRanges.forEach((entity) => {
          let indexData = entity.key;
          const userTagId = entityMap[indexData].data.mention.id;

          block.text = block.text.replaceBetween(
            entity.offset,
            entity.offset + entity.length,
            `<@tag>${userTagId}<@tag>`
          );
        });
      }
    });

    let value = cloneBlocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("<br>");

    let userIds = [];
    if (mentions.length > 0) {
      userIds = mentions.map((m) => m.id);
    }

    commentApi
      .addComment({
        commentTaskId: task.taskId,
        commentUserId: user.id,
        commentUserAvatar: user.userAvatar,
        commentUserName: user.fullName,
        commentContent: value,
        commentCreatedAt: new Date().toISOString(),
        commentIsDeleted: false,
        commentUserTagIds: userIds,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const viewHistory = () => {
    dispatch(
      setViewHistory({
        show: true,
        taskId: task.taskId,
      })
    );
  };

  return (
    <div>
      <CModal
        className="task-modal"
        show={props.isShowEditPopup}
        onClose={handleClose}
        size="lg"
      >
        <CModalHeader closeButton>
          {props.data ? (
            <div className="card-labels">
              <div
                className="progress-label"
                style={{ backgroundColor: getColorFromValue() }}
              >
                <div className="progress-icon">
                  <CIcon name="cil-chart-line" />
                </div>
                <div className="task-progress">
                  {task.taskCompletedPercent}%
                </div>
              </div>
              <div
                className="task-status-label-header"
                style={{
                  backgroundColor: getStatusBackgroundColor(),
                  color: getStatusColor(),
                  fontWeight: "bold",
                }}
              >
                {getStatusText(task.taskStatus)}
              </div>
            </div>
          ) : null}
        </CModalHeader>
        <CModalBody>
          {props.data ? (
            <CRow>
              <CCol className="" lg="9" sm="12">
                <div className="form-content">
                  <div className="title-label">
                    <CIcon name="cil-credit-card" />
                    <div className="name">Tên</div>
                  </div>
                  <div className="name-input-container">
                    <CInput
                      disabled={!adminAction}
                      id="name"
                      placeholder="Tên công việc..."
                      required
                      autoCorrect="off"
                      autoComplete="off"
                      autocomplete="off"
                      type="text"
                      value={task.taskName}
                      name="taskName"
                      onChange={handleInputNameAndDes}
                    />
                    {taskNameEditing && (
                      <div className="save-name-btn" onClick={onSaveTaskName}>
                        Lưu
                      </div>
                    )}
                  </div>
                  <div className="description-label">
                    <CIcon name="cil-description" />
                    <div className="description">Mô tả công việc</div>
                  </div>
                  <div className="description-input-container">
                    <TextareaAutosize
                      disabled={!adminAction}
                      className="input-post"
                      minRows={1}
                      maxRows={20}
                      placeholder="Mô tả công việc..."
                      value={task.taskDescription}
                      onChange={handleInputNameAndDes}
                      name="taskDescription"
                    />
                    {taskDescriptionEditing && (
                      <div
                        className="save-description-btn"
                        onClick={onSaveTaskDescription}
                      >
                        Lưu
                      </div>
                    )}
                  </div>
                  <div className="card-divider"></div>
                  <div
                    className="show-detail-toggle"
                    onClick={() => {
                      setShowDetail(!showDetail);
                    }}
                  >
                    <div className="detail-toggle-label">
                      <CIcon name="cil-settings" />
                      <div className="label-name">Cập nhật nâng cao</div>
                    </div>
                    <CIcon
                      className="icon-up-down"
                      name={showDetail ? "cil-caret-bottom" : "cil-caret-left"}
                    />
                  </div>
                  <CCollapse className="advanced-collapse" show={showDetail}>
                    <div className="infor-bar">
                      <CRow className="my-row">
                        {props.isOfTeam && (
                          <CCol className="col-12">
                            <div className="assign-group item-group">
                              <div className="assign-label label">
                                <CIcon name="cil-user-follow" />
                                Giao cho
                              </div>
                              <div style={{ width: "15rem" }}>
                                <Select
                                  isDisabled={!adminAction}
                                  className="basic-single"
                                  value={current}
                                  isClearable="true"
                                  isSearchable="true"
                                  name="member"
                                  options={memberList}
                                  placeholder="Chọn thành viên..."
                                  components={{
                                    Option: CustomOption,
                                    SingleValue: ValueOption,
                                  }}
                                  noOptionsMessage={() => "Không tìm thấy"}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                          </CCol>
                        )}
                        <CRow>
                          <CCol lg="6" sm="6" xs="12">
                            <div className="start-group item-group">
                              <div className=" start-label label">
                                <CIcon name="cil-clock" />
                                Ngày bắt đầu
                              </div>
                              <div className="start-date">
                                <CInput
                                  disabled={!adminAction}
                                  type="date"
                                  id="date-from"
                                  name="date-input"
                                  placeholder="date"
                                  value={moment(task.taskStartDate).format(
                                    "YYYY-MM-DD"
                                  )}
                                  onChange={onChangeStartDate}
                                />
                              </div>
                            </div>
                          </CCol>
                          <CCol lg="6" sm="6" xs="12">
                            <div className="due-group item-group">
                              <div className=" due-label label">
                                <CIcon name="cil-clock" />
                                Hạn hoàn thành
                              </div>
                              <div className=" due-date">
                                <CInput
                                  disabled={!adminAction}
                                  type="date"
                                  id="date-from"
                                  name="date-input"
                                  placeholder="date"
                                  value={moment(task.taskDeadline).format(
                                    "YYYY-MM-DD"
                                  )}
                                  onChange={onChangeDeadline}
                                />
                              </div>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="6" xs="12">
                            <div className="theme-group item-group">
                              <div className="theme-label label">
                                <CIcon name="cil-color-palette" />
                                Màu chủ đề
                              </div>
                              <button
                                className="theme-color toggle-color-picker"
                                onBlur={onButtonThemeBlur}
                                onClick={onButtonThemeClicked}
                                style={{
                                  backgroundColor: task.taskThemeColor
                                    ? task.taskThemeColor
                                    : "#fff",
                                  border: task.taskThemeColor
                                    ? "none"
                                    : "1px solid gray",
                                }}
                              >
                                {isShowColorPicker ? (
                                  <CirclePicker
                                    color={finalColor}
                                    colors={colorPalette}
                                    onChangeComplete={onChangeColorTask}
                                  />
                                ) : null}
                                {task.taskThemeColor && (
                                  <div
                                    className="delete-theme-icon"
                                    onClick={onDeleteThemeTask}
                                  >
                                    <CIcon name="cil-x" />
                                  </div>
                                )}
                              </button>
                            </div>
                          </CCol>
                          <CCol lg="6" sm="6" xs="12">
                            <div className="status-group item-group">
                              <div className="status-label label">
                                <CIcon name="cil-task" />
                                Trạng thái
                              </div>
                              <div className="task-status-dropdown status-infor">
                                <CDropdown>
                                  <CDropdownToggle
                                    id="dropdownMenuButton"
                                    className="my-btn"
                                    style={{
                                      backgroundColor:
                                        getStatusBackgroundColor(),
                                      color: getStatusColor(),
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {getStatusText()}
                                  </CDropdownToggle>
                                  <CDropdownMenu
                                    aria-labelledby="dropdownMenuButton"
                                    placement="bottom-end"
                                    onClick={onChooseStatus}
                                  >
                                    {task.taskStatus !== "todo" && (
                                      <CDropdownItem className="todo-status">
                                        <div
                                          className="color-dot"
                                          style={{
                                            backgroundColor:
                                              getStatusColorFormText("todo"),
                                          }}
                                        ></div>
                                        Đang chờ
                                      </CDropdownItem>
                                    )}

                                    {task.taskStatus !== "doing" && (
                                      <CDropdownItem className="doing-status">
                                        <div
                                          className="color-dot"
                                          style={{
                                            backgroundColor:
                                              getStatusColorFormText("doing"),
                                          }}
                                        ></div>
                                        Đang thực hiện
                                      </CDropdownItem>
                                    )}
                                    {task.taskStatus !== "done" && (
                                      <CDropdownItem className="done-status">
                                        <div
                                          className="color-dot"
                                          style={{
                                            backgroundColor:
                                              getStatusColorFormText("done"),
                                          }}
                                        ></div>
                                        Hoàn thành
                                      </CDropdownItem>
                                    )}
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                            </div>
                          </CCol>
                        </CRow>
                      </CRow>
                      <div className="progress-group item-group">
                        <div className="progress-label label">
                          <CIcon name="cil-chart-line" />
                          Tiến độ
                        </div>
                        <div className="slider-container">
                          <Range
                            className="range"
                            values={renderedValue}
                            step={1}
                            min={0}
                            max={100}
                            onChange={(values) => setRenderedValue(values)}
                            onFinalChange={(values) => {
                              setValue(values[0]);
                              handleUpdateTask(values[0]);
                            }}
                            renderTrack={({ props, children }) => (
                              <div
                                className="track-container"
                                style={{
                                  ...props.style,
                                }}
                              >
                                <div
                                  className="track-bar"
                                  ref={props.ref}
                                  style={{
                                    background: getTrackBackground({
                                      values: renderedValue,
                                      colors: [getColorFromValue(), "#EAECF0"],
                                      min: 0,
                                      max: 100,
                                    }),
                                  }}
                                >
                                  {children}
                                </div>
                              </div>
                            )}
                            renderThumb={({ props, isDragged }) => (
                              <div
                                className="thumb"
                                {...props}
                                style={{
                                  ...props.style,
                                }}
                              >
                                <div
                                  style={{
                                    height: "16px",
                                    width: "5px",
                                    backgroundColor: isDragged
                                      ? getColorFromValue()
                                      : "#CCC",
                                  }}
                                />
                                <div
                                  style={{
                                    backgroundColor: getColorFromValue(),
                                  }}
                                  className="value"
                                >
                                  {renderedValue}
                                </div>
                              </div>
                            )}
                          />
                          <div className="result">{value}%</div>
                        </div>
                      </div>
                    </div>
                    <div className="card-divider"></div>
                    <div className="task-avatar-label">
                      <div className="label-title">
                        <CIcon name="cil-image" />
                        <div className="description">Ảnh đại diện</div>
                      </div>
                      <div onClick={onPickImage} className="label-action">
                        <CIcon name="cil-plus" />
                        <div className="action-name">Tải ảnh lên</div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={imageRef}
                          onChange={onImagePickChange}
                          style={{ display: "none" }}
                        ></input>
                      </div>
                    </div>

                    {task.taskImageUrl ? (
                      <div className="task-avatar">
                        <img src={task.taskImageUrl} alt="" />
                        <div
                          onClick={onDeleteTaskAvatar}
                          className="delete-task-avatar-icon"
                        >
                          <CIcon name="cil-x" />
                        </div>
                      </div>
                    ) : null}
                    <div className="card-divider"></div>
                    <div className="attachment-label">
                      <div className="label-title">
                        <CIcon name="cil-paperclip" />
                        <div className="description">Tệp đính kèm</div>
                      </div>

                      <div onClick={onPickFile} className="label-action">
                        <CIcon name="cil-plus" />
                        <div className="action-name">Tải tệp lên</div>
                        <input
                          type="file"
                          ref={fileRef}
                          onChange={onFilePickChange}
                          style={{ display: "none" }}
                        ></input>
                      </div>
                    </div>
                    <div className="list-attachments">
                      {attachments.map((item) => {
                        return (
                          <div className="attachment-item">
                            <img alt="" src={GetFileTypeImage(item.fileType)} />
                            <div className="attachment-name-containner">
                              <div className="download-icon-container">
                                <CIcon name="cil-vertical-align-bottom" />
                                <a
                                  href={item.fileUrl}
                                  name="cil-space-bar"
                                  className="icon-bottom"
                                >
                                  <CIcon />
                                </a>
                              </div>
                              <div className="attachment-name">
                                {item.fileName}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CCollapse>
                  <div className="card-divider"></div>
                  <div className="comment-label">
                    <CIcon name="cil-speech" />
                    <div className="commnet">Bình luận</div>
                  </div>
                  <div className="my-comment">
                    <div className="my-avatar">
                      <img alt="" src={curUser.userAvatar} />
                    </div>
                    <div className="input-container">
                      <TaskCommentInput
                        saveContent={saveContent}
                        boardId={currentBoard}
                      />
                    </div>
                  </div>
                  <div className="comment-list">
                    {cmtLists.map((item) => {
                      return (
                        <CommentItem comment={item} key={item.commentId} />
                      );
                    })}

                    <div
                      className="load-more-comment"
                      onClick={seeMoreComments}
                    >
                      <div>
                        <i>Xem thêm</i>
                      </div>
                      <div className="rotate">&#171;</div>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol className="" lg="3" sm="12">
                <div className="form-actions">
                  <Popover
                    className="lists-select-popover"
                    isOpen={openPopoverLists}
                    align="start"
                    positions={["left"]} // preferred positions by priority
                    onClickOutside={() => setOpenPopoverLists(false)}
                    content={renderContentList()}
                    ref={pop1}
                  >
                    <div
                      className="action-item"
                      onClick={() => setOpenPopoverLists(!openPopoverLists)}
                    >
                      <BsArrowsMove className="icon-move" />
                      <div className="action-name">Chuyển đến...</div>
                    </div>
                  </Popover>

                  {props.data.showPoint && (
                    <Popover
                      ref={pop2}
                      className="lists-select-popover"
                      isOpen={openPopoverScores}
                      align="start"
                      positions={["left"]} // preferred positions by priority
                      onClickOutside={() => setOpenPopoverScores(false)}
                      content={renderContentScore()}
                    >
                      <div
                        className="action-item"
                        onClick={() => setOpenPopoverScores(!openPopoverScores)}
                      >
                        <CIcon name="cil-sort-numeric-up" />
                        <div className="action-name">Cho điểm</div>
                      </div>
                    </Popover>
                  )}
                  <CTooltip content="Xem lịch sử chỉnh sửa" placement="left">
                    <div className="action-item" onClick={viewHistory}>
                      <GrDocumentTime className="icon-version" />
                      <div className="action-name">Lịch sử chỉnh sửa</div>
                    </div>
                  </CTooltip>

                  {props.data.showPoint && (
                    <CTooltip content="Xóa công việc" placement="left">
                      <div className="action-item" onClick={onRemoveTask}>
                        <CIcon name="cil-trash" />
                        <div className="action-name">Xóa công việc</div>
                      </div>
                    </CTooltip>
                  )}
                </div>
              </CCol>
            </CRow>
          ) : (
            <Loading />
          )}
        </CModalBody>
      </CModal>
    </div>
  );
}

export default TaskEditModal;
