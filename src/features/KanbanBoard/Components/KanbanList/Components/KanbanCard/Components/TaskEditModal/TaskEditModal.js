import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./TaskEditModal.scss";
import CIcon from "@coreui/icons-react";
import { Range, getTrackBackground } from "react-range";

import {
  CButton,
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
  CProgress,
  CRow,
  CTextarea,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import { CirclePicker } from "react-color";
import ProgressSlider from "src/shared_components/MySharedComponents/ProgressSlider/ProgressSlider";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "src/appSlice";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import CommentItem from "src/features/NewsFeedPage/Components/Post/Components/CommentItem/CommentItem";
import { GetFileTypeImage, GetTypeFromExt } from "src/utils/file/index";
import CardLoading from "../../CardLoading/CardLoading";
import taskApi from "src/api/taskApi";
import { updateEditTask } from "../../../../../../kanbanSlice";
import { myBucket } from "src/utils/aws/config";
import { v4 as uuidv4 } from 'uuid';
import fileApi from "src/api/fileApi";
import commentApi from "src/api/commentApi";

TaskEditModal.propTypes = {};

function TaskEditModal(props) {
  const [toasts, setToasts] = useState([]);
  const dispatch = useDispatch();
  const [finalColor, changeColor] = useState(null);
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [taskNameEditing, setTaskNameEditing] = useState(false);
  const [taskDescriptionEditing, setTaskDescriptionEditing] = useState(false);

  const [task, setTask] = useState({});
  const [showDetail, setShowDetail] = useState(false);

  const handleTasks = useSelector((state) => state.app.handleTasks);
  const users = useSelector((state) => state.app.users);
  const [value, setValue] = useState(null);
  const [renderedValue, setRenderedValue] = useState([0]);

  const [cmtLists, setCmtLists] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [triggerUpdateTask, setTriggerUpdateTask] = useState(-1);//cause setState is asynchonous action

  const curUser = useSelector(state => state.auth.currentUser);
  const [commentContent, setCommentContent] = useState('');

  const addToast = () => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: 1000,
        closeButton: false,
        fade: true,
      },
    ]);
  };
  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();


  const imageRef = useRef(null);
  const fileRef = useRef(null);

  /*const cmtLists = [
    {
      commentId: "comment_1",
      commentPostId: "",
      commentUserId: "user_1",
      commentContent: "Chào các bạn mình là nguyễn hồng khoa nè",
      commentCreatedAt: new Date(2020, 2, 3),
      commentIsDeleted: false,
      userName: "Khoa Nguyễn",
    },
    {
      commentId: "comment_5",
      commentPostId: "",
      commentUserId: "user_1",
      commentContent: "Task này cần hoàn thành trước hôm nay",
      commentCreatedAt: new Date(2020, 2, 3),
      commentIsDeleted: false,
      userName: "Tiễu Dũng Dũng",
    },
    {
      commentId: "comment_2",
      commentPostId: "",
      commentUserId: "user_1",
      commentContent: "OK nha",
      commentCreatedAt: new Date(2020, 2, 3),
      commentIsDeleted: false,
      userName: "A Thoòn",
    },
    {
      commentId: "comment_3",
      commentPostId: "",
      commentUserId: "user_1",
      commentContent: "Loremis bullshit",
      commentCreatedAt: new Date(2020, 2, 3),
      commentIsDeleted: false,
      userName: "Sơn Tùng",
    },
    {
      commentId: "comment_4",
      commentPostId: "",
      commentUserId: "user_1",
      commentContent:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available",
      commentCreatedAt: new Date(2020, 2, 3),
      commentIsDeleted: false,
      userName: "Leader Nè",
    },
  ];*/

  /*const attachments = [
    {
      fileId: "file_1",
      fileName: "Báo cáo.docx",
      fileType: "word",
    },
    {
      fileId: "file_2",
      fileName: "Seminar thuyết trình.pptx",
      fileType: "powerpoint",
    },
    {
      fileId: "file_3",
      fileName: "Bản thống kê điểm.xls",
      fileType: "excel",
    },
    {
      fileId: "file_4",
      fileName: "Báo cáo converted.pdf",
      fileType: "pdf",
    },
    {
      fileId: "file_5",
      fileName: "images.rar",
      fileType: "rar",
    },
  ];
  */

  useEffect(() => {
    if (props.data) {
      setTask({ ...props.data });
      changeColor(props.data.taskThemeColor ? props.data.taskThemeColor : "ffffff");
      setValue(props.data.taskCompletedPercent);
      setRenderedValue([
        props.data.taskCompletedPercent,
      ]);
      setCmtLists(props.data.comments);
      setAttachments(props.data.files);
    }
  }, [props.data])



  const dispatchUpdateTask = () => {
    setTriggerUpdateTask(triggerUpdateTask + 1);
  }


  useEffect(() => {
    if (triggerUpdateTask < 0)
      return;
    const taskMapObj = {
      "kanbanListId": task.kanbanListId,
      "taskId": task.taskId,
      "image": task.taskImageUrl,
      "taskName": task.taskName,
      "taskDeadline": task.taskDeadline,
      "taskDescription": task.taskDescription,
      "taskStatus": task.taskStatus,
      "commentsCount": task.commentsCount,
      "filesCount": task.filesCount,
      "userId": task.userId,
      "userAvatar": task.userAvatar,
      "taskCompletedPercent": task.taskCompletedPercent,
      "taskThemeColor": task.taskThemeColor,
      "taskImageUrl": task.taskImageUrl,
    }
    dispatch(updateEditTask(taskMapObj));
  }, [triggerUpdateTask]);

  const assignedUserImage = getAssignedUserImage();
  function getAssignedUserImage() {
    //find handleTask
    let userHandleId = "";
    for (let i = 0; i < handleTasks.length; i++) {
      if (handleTasks[i].handleTaskTaskId === task.taskId) {
        userHandleId = handleTasks[i].handleTaskUserId;
        break;
      }
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === userHandleId) {
        return users[i].userImageUrl;
      }
    }
    return "";
  }

  function handleClose() {
    if (props.closePopup) {
      props.closePopup();
    }
  }
  function handleKeyDown(e) {
    const limit = 80;

    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }
  function handleInputNameAndDes(e) {
    const { name, value } = e.target;
    if (name === 'taskName')
      setTaskNameEditing(true);
    else
      setTaskDescriptionEditing(true);

    setTask({
      ...task,
      [name]: value,
    });
  }


  function onSaveTaskName() {
    if (task.taskName === "" || task.taskName === undefined || task.taskName === null) {
      addToast();
      return;
    }

    taskApi.updateTask({
      taskId: task.taskId,
      taskName: task.taskName,
      taskThemeColor: task.taskThemeColor,
      taskStatus: task.taskStatus,
      taskCompletedPercent: task.taskCompletedPercent,
      taskDeadline: task.taskDeadline,
      taskImageUrl: task.taskImageUrl,
    }).then(res => { }).catch(err => { });

    //dispatch(updateTask(task));

    dispatchUpdateTask();
    setTaskNameEditing(false);
  }

  function onSaveTaskDescription() {
    if (task.taskDescription === "") {
      addToast();
      return;
    }

    taskApi.updateTask({
      taskId: task.taskId,
      taskDescription: task.taskDescription,
      taskThemeColor: task.taskThemeColor,
      taskStatus: task.taskStatus,
      taskCompletedPercent: task.taskCompletedPercent,
      taskDeadline: task.taskDeadline,
      taskImageUrl: task.taskImageUrl,
    }).then(res => { }).catch(err => { });

    //dispatch(updateTask(task));

    dispatchUpdateTask();
    setTaskDescriptionEditing(false);
  }

  function onChangeDeadline(e) {
    const dateParts = e.target.value.split("-");
    const newDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
    const newTask = {
      ...task,
      taskDeadline: newDate,
    };

    taskApi.updateTask({
      taskId: task.taskId,
      taskDeadline: newDate,
      taskThemeColor: task.taskThemeColor,
      taskStatus: task.taskStatus,
      taskCompletedPercent: task.taskCompletedPercent,
      taskImageUrl: task.taskImageUrl,
    }).then(res => { }).catch(err => { });
    setTask(newTask);
    dispatchUpdateTask();

    //dispatch(updateTask(newTask));
  }

  function getStatusText() {
    switch (task.taskStatus) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      default:
        return "Hoàn thành";
    }
  }

  function getStatusColor() {
    switch (task.taskStatus) {
      case "todo":
        return "#DE4436";
      case "doing":
        return "#FFC542";
      default:
        return "#04D182";
    }
  }

  function onChooseStatus(e) {
    const newStatus = e.target.classList[0];
    switch (newStatus) {
      case "todo-status": {
        const newTask = {
          ...task,
          taskStatus: "todo",
        };

        taskApi.updateTask({
          taskId: task.taskId,
          taskThemeColor: task.taskThemeColor,
          taskStatus: 'todo',
          taskCompletedPercent: task.taskCompletedPercent,
          taskDeadline: task.taskDeadline,
          taskImageUrl: task.taskImageUrl,
        }).then(res => { }).catch(err => { });

        setTask(newTask);
        dispatchUpdateTask();
        //dispatch(updateTask(newTask));
        return;
      }
      case "doing-status": {
        const newTask = {
          ...task,
          taskStatus: "doing",
        };

        taskApi.updateTask({
          taskId: task.taskId,
          taskThemeColor: task.taskThemeColor,
          taskStatus: 'doing',
          taskCompletedPercent: task.taskCompletedPercent,
          taskDeadline: task.taskDeadline,
          taskImageUrl: task.taskImageUrl,
        }).then(res => { }).catch(err => { });
        setTask(newTask);
        dispatchUpdateTask();
        //dispatch(updateTask(newTask));
        return;
      }
      default: {
        const newTask = {
          ...task,
          taskStatus: "done",
        };

        taskApi.updateTask({
          taskId: task.taskId,
          taskThemeColor: task.taskThemeColor,
          taskStatus: 'done',
          taskCompletedPercent: task.taskCompletedPercent,
          taskDeadline: task.taskDeadline,
          taskImageUrl: task.taskImageUrl,
        }).then(res => { }).catch(err => { });
        setTask(newTask);
        dispatchUpdateTask();
        //dispatch(updateTask(newTask));
        return;
      }
    }
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
    const newTask = {
      ...task,
      taskThemeColor: colore.hex,
    };

    taskApi.updateTask({
      taskId: task.taskId,
      taskThemeColor: colore.hex,
      taskStatus: task.taskStatus,
      taskCompletedPercent: task.taskCompletedPercent,
      taskDeadline: task.taskDeadline,
      taskImageUrl: task.taskImageUrl,
    }).then(res => { }).catch(err => { });
    setTask(newTask);
    dispatchUpdateTask();
    //dispatch(updateTask(newTask));
  }

  function onDeleteThemeTask() {
    const newTask = {
      ...task,
      taskThemeColor: "",
    };
    changeColor("#FFF");
    setTask(newTask);
    dispatch(updateTask(newTask));
  }

  function handleUpdateTask(value) {
    const newTask = {
      ...task,
      taskCompletedPercent: value,
    };

    taskApi.updateTask({
      taskId: task.taskId,
      taskThemeColor: task.taskThemeColor,
      taskStatus: task.taskStatus,
      taskCompletedPercent: value,
      taskDeadline: task.taskDeadline,
      taskImageUrl: task.taskImageUrl,
    }).then(res => { }).catch(err => { });
    setTask(newTask);
    dispatchUpdateTask();
    //dispatch(updateTask(newTask));
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
    taskApi.updateTask({
      taskId: task.taskId,
      taskDeadline: task.taskDeadline,
      taskThemeColor: task.taskThemeColor,
      taskStatus: task.taskStatus,
      taskCompletedPercent: task.taskCompletedPercent,
      taskImageUrl: null,
    }).then(res => { }).catch(err => { });

    setTask({
      ...task,
      taskImageUrl: null,
    });

    dispatchUpdateTask();
  }



  const onPickImage = () => {
    imageRef.current.click();
  }
  const onImagePickChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const folder = uuidv4();
      const params = {
        Body: file,
        Bucket: 'teamappstorage',
        Key: `${folder}/${file.name}`,
      };

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          if (pro >= 100) {
            const imageUrl = `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`;
            setTask({
              ...task,
              taskImageUrl: imageUrl,
            });

            taskApi.updateTask({
              taskId: task.taskId,
              taskDeadline: task.taskDeadline,
              taskThemeColor: task.taskThemeColor,
              taskStatus: task.taskStatus,
              taskCompletedPercent: task.taskCompletedPercent,
              taskImageUrl: imageUrl,
            }).then(res => { }).catch(err => { });

            dispatchUpdateTask();


          }
        })
        .send((err) => {

        });
    }
  }



  const onAddComment = (e) => {
    if (e.key === 'Enter') {
      if (commentContent !== '') {
        console.log(commentContent);
        commentApi.addComment({
          "commentTaskId": task.taskId,
          "commentUserId": curUser.id,
          "commentContent": commentContent,
          "commentCreatedAt": new Date().toISOString(),
          "commentIsDeleted": false,
        }).then(res => {

          setTask({
            ...task,
            commentsCount: task.commentsCount + 1,
          });

          const cmtObj = {
            'commentId': res.data.commentId,
            'commentTaskId': res.data.commentTaskId,
            'commentUserId': res.data.commentUserId,
            'commentContent': res.data.commentContent,
            'userName': curUser.fullName,
            'userAvatar': curUser.userAvatar,
            'commentCreatedAt': res.data.commentCreatedAt,
          };

          const cmtListsClone = [...cmtLists];
          cmtListsClone.splice(0, 0, cmtObj);
          setCmtLists(cmtListsClone);

          dispatchUpdateTask();
        }).catch(err => { });
      }
      setCommentContent('');
    }
  }

  const onFilePickChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const folder = uuidv4();
      const params = {
        Body: file,
        Bucket: 'teamappstorage',
        Key: `${folder}/${file.name}`,
      };

      myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          if (pro >= 100) {
            const fileUrl = `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`;
            setTask({
              ...task,
              filesCount: task.filesCount + 1,
            });

            fileApi.addFile({
              fileName: file.name,
              fileUrl: fileUrl,
              fileType: GetTypeFromExt(file.name),
              userId: curUser.id,
              fileBelongedId: task.taskId,
            }).then(res => {
              const attachmentsClone = [...attachments];
              attachmentsClone.splice(0, 0, res.data);
              setAttachments(attachmentsClone);
              dispatchUpdateTask();
            }).catch(err => { });

          }
        })
        .send((err) => {

        });
    }
  }

  const onPickFile = () => {
    fileRef.current.click();
  }


  const seeMoreComments = async () => {
    const params = {
      taskId: task.taskId,
      skipItems: cmtLists.length,
    };
    const res = await commentApi.getByTask({ params });
    const cloneCmtList = [...cmtLists];
    const newCmts = cloneCmtList.concat(res.data);
    setCmtLists(newCmts);
  }
  return (
    <div>
      <div>
        {Object.keys(toasters).map((toasterKey) => (
          <CToaster position={toasterKey} key={"toaster" + toasterKey}>
            {toasters[toasterKey].map((toast, key) => {
              return (
                <CToast show={true} autohide={2000} fade={true}>
                  <CToastBody>
                    <CIcon name="cil-warning" />
                    Tên Công việc không được rỗng!
                  </CToastBody>
                </CToast>
              );
            })}
          </CToaster>
        ))}
      </div>
      <CModal show={props.isShowEditPopup} onClose={handleClose} size="lg">
        <CModalHeader closeButton>
          {props.data ? <div className="card-labels">
            <div className="progress-label">
              <div className="progress-icon">
                <CIcon name="cil-chart-line" />
              </div>
              <div className="task-progress">{task.taskCompletedPercent}%</div>
            </div>

            <div className="task-status-label-header">{getStatusText(task.taskStatus)}</div>
          </div> : null}
        </CModalHeader>
        <CModalBody>
          {props.data ? <CRow>
            <CCol className="col-9">
              <div className="form-content">
                <div className="title-label">
                  <CIcon name="cil-credit-card" />
                  <div className="name">Tên</div>
                </div>
                <div className="name-input-container">
                  <CInput
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
                  {/* <CTextarea
                    onKeyDown={handleKeyDown}
                    name="textarea-input"
                    id="textarea-input"
                    rows="9"
                    placeholder="Mô tả công việc..."
                    autocomplete="off"
                  /> */}
                  <TextareaAutosize
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
                    name={showDetail ? "cil-caret-top" : "cil-caret-bottom"}
                  />
                </div>
                <CCollapse className="advanced-collapse" show={showDetail}>
                  <div className="infor-bar">
                    <CRow className="my-row">
                      <CCol className="col-6 my-col left">
                        <div className="assign-group item-group">
                          <div className="assign-label label">
                            <CIcon name="cil-user-follow" />
                            Giao cho
                          </div>
                          <div className="assigned-user-avatar">
                            <img src={task.userAvatar} alt="" />
                          </div>
                        </div>
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
                      <CCol className="col-6 my-col right">
                        <div className="due-group item-group">
                          <div className=" due-label label">
                            <CIcon name="cil-clock" />
                            Hạn hoàn thành
                          </div>
                          <div className=" due-date">
                            <CInput
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
                                style={{ backgroundColor: getStatusColor() }}
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
                                    <div className="color-dot"></div>
                                    Đang chờ
                                  </CDropdownItem>
                                )}

                                {task.taskStatus !== "doing" && (
                                  <CDropdownItem className="doing-status">
                                    <div className="color-dot"></div>
                                    Đang thực hiện
                                  </CDropdownItem>
                                )}
                                {task.taskStatus !== "done" && (
                                  <CDropdownItem className="done-status">
                                    <div className="color-dot"></div>
                                    Hoàn thành
                                  </CDropdownItem>
                                )}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                        </div>
                      </CCol>
                    </CRow>

                    <div className="progress-group item-group">
                      <div className="progress-label label">
                        <CIcon name="cil-chart-line" />
                        Tiến độ
                      </div>

                      {/* <ProgressSlider
                      task={props.data}
                      value={props.data.taskCompletedPercent}
                    /> */}
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
                              //onMouseDown={props.onMouseDown}
                              //onTouchStart={props.onTouchStart}
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
                                style={{ backgroundColor: getColorFromValue() }}
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
                      <input type="file" accept="image/*" ref={imageRef} onChange={onImagePickChange} style={{ display: "none" }}></input>
                    </div>
                  </div>

                  {task.taskImageUrl ? <div className="task-avatar">
                    <img
                      src={task.taskImageUrl}
                      alt=""
                    />
                    <div onClick={onDeleteTaskAvatar} className="delete-task-avatar-icon">
                      <CIcon name="cil-x" />
                    </div>
                  </div> : null}
                  <div className="card-divider"></div>
                  <div className="attachment-label">
                    <div className="label-title">
                      <CIcon name="cil-paperclip" />
                      <div className="description">Tệp đính kèm</div>
                    </div>

                    <div onClick={onPickFile} className="label-action">
                      <CIcon name="cil-plus" />
                      <div className="action-name">Tải tệp lên</div>
                      <input type="file" ref={fileRef} onChange={onFilePickChange} style={{ display: "none" }}></input>
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
                              <a href={item.fileUrl} name="cil-space-bar"
                                className="icon-bottom">
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
                    <img alt="" src="avatars/6.jpg" />
                  </div>
                  <div className="input-container">
                    <CInput
                      type="text"
                      placeholder="Viết bình luận..."
                      onKeyDown={onAddComment}
                      onChange={(e) => setCommentContent(e.target.value)}
                      value={commentContent}
                    />
                  </div>
                </div>
                <div className="comment-list">
                  {cmtLists.map((item) => {
                    return <CommentItem comment={item} key={item.commentId} />;
                  })}

                  <div className="load-more-comment" onClick={seeMoreComments}>
                    <div>
                      <i>Xem thêm</i>
                    </div>
                    <div className="rotate">&#171;</div>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol className="col-3">
              <div className="form-actions">
                {/* <div className="action-item">
                          <CIcon name="cil-clock" />
                          <div className="action-name">Hạn hoàn thành</div>
                        </div> */}
                {/* <div className="action-item">
                          <CIcon name="cil-paperclip" />
                          <div className="action-name">Tài liệu đính kèm</div>
                        </div> */}
                <div className="action-item">
                  <CIcon name="cil-share-boxed" />
                  <div className="action-name">Chuyển đến...</div>
                </div>
                {/* <div className="action-item">
                          <CIcon name="cil-chart-line" />
                          <div className="action-name">Tiến độ</div>
                        </div> */}
                {/* <div className="action-item">
                          <CIcon name="cil-task" />
                          <div className="action-name">Trạng thái</div>
                        </div> */}
                {/* <div className="action-item">
                          <CIcon name="cil-color-palette" />
                          <div className="action-name">Màu chủ đề</div>
                        </div> */}
                <div className="action-item">
                  <CIcon name="cil-sort-numeric-up" />
                  <div className="action-name">Cho điểm</div>
                </div>
                <div className="action-item">
                  <CIcon name="cil-trash" />
                  <div className="action-name">Xóa công việc</div>
                </div>
              </div>
            </CCol>
          </CRow> : <div><CardLoading /></div>}
        </CModalBody>
      </CModal>
    </div>
  );
}

export default TaskEditModal;
