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
import { GetFileTypeImage } from "src/utils/file/index";

TaskEditModal.propTypes = {};

function TaskEditModal(props) {
  const [toasts, setToasts] = useState([]);
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

  const dispatch = useDispatch();
  const [finalColor, changeColor] = useState(
    props.data.taskThemeColor ? props.data.taskThemeColor : "ffffff"
  );
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [taskNameEditing, setTaskNameEditing] = useState(false);
  const [taskDescriptionEditing, setTaskDescriptionEditing] = useState(false);
  var initTask = { ...props.data };
  const [task, setTask] = useState(initTask);
  const [showDetail, setShowDetail] = useState(false);

  const handleTasks = useSelector((state) => state.app.handleTasks);
  const users = useSelector((state) => state.app.users);
  const [value, setValue] = useState(props.data.taskCompletedPercent);
  const [renderedValue, setRenderedValue] = useState([
    props.data.taskCompletedPercent,
  ]);

  const cmtLists = [
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
  ];

  const attachments = [
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

  const assignedUserImage = getAssignedUserImage();
  function getAssignedUserImage() {
    //find handleTask
    let userHandleId = "";
    for (let i = 0; i < handleTasks.length; i++) {
      if (handleTasks[i].handleTaskTaskId === props.data.taskId) {
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
  function handleInputName(e) {
    setTaskNameEditing(true);
    const newTask = {
      ...task,
      taskName: e.target.value,
    };
    setTask(newTask);
  }
  function handleInputDescription(e) {
    setTaskDescriptionEditing(true);
    const newTask = {
      ...task,
      taskDescription: e.target.value,
    };
    setTask(newTask);
  }

  function onSaveTaskName() {
    if (task.taskName === "") {
      addToast();
      return;
    }
    dispatch(updateTask(task));
    setTaskNameEditing(false);
  }
  function onSaveTaskDescription() {
    if (task.taskDescription === "") {
      addToast();
      return;
    }
    dispatch(updateTask(task));
    setTaskDescriptionEditing(false);
  }

  function onChangeDeadline(e) {
    const dateParts = e.target.value.split("-");
    const newDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
    const newTask = {
      ...task,
      taskDeadline: newDate,
    };
    setTask(newTask);
    dispatch(updateTask(newTask));
  }

  function getStatusText() {
    switch (props.data.taskStatus) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      default:
        return "Hoàn thành";
    }
  }

  function getStatusColor() {
    switch (props.data.taskStatus) {
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
        setTask(newTask);
        dispatch(updateTask(newTask));
        return;
      }
      case "doing-status": {
        const newTask = {
          ...task,
          taskStatus: "doing",
        };
        setTask(newTask);
        dispatch(updateTask(newTask));
        return;
      }
      default: {
        const newTask = {
          ...task,
          taskStatus: "done",
        };
        setTask(newTask);
        dispatch(updateTask(newTask));
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
    setTask(newTask);
    dispatch(updateTask(newTask));
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

    setTask(newTask);
    dispatch(updateTask(newTask));
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
          <div className="card-labels">
            <div className="progress-label">
              <div className="progress-icon">
                <CIcon name="cil-chart-line" />
              </div>
              <div className="task-progress">25%</div>
            </div>

            <div className="task-status-label-header">Đang thực hiện</div>
          </div>
        </CModalHeader>
        <CModalBody>
          <CRow>
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
                    onChange={handleInputName}
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
                    onChange={handleInputDescription}
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
                <CCollapse show={showDetail}>
                  <div className="infor-bar">
                    <CRow className="my-row">
                      <CCol className="col-6 my-col left">
                        <div className="assign-group item-group">
                          <div className="assign-label label">
                            <CIcon name="cil-user-follow" />
                            Giao cho
                          </div>
                          <div className="assigned-user-avatar">
                            <img src={assignedUserImage} alt="" />
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
                              value={moment(props.data.taskDeadline).format(
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
                    <div className="label-action">
                      <CIcon name="cil-plus" />
                      <div className="action-name">Tải ảnh lên</div>
                    </div>
                  </div>
                  <div className="task-avatar">
                    <img
                      src="https://emilus.themenate.net/img/others/img-13.jpg"
                      alt=""
                    />
                    <div className="delete-task-avatar-icon">
                      <CIcon name="cil-x" />
                    </div>
                  </div>
                  <div className="card-divider"></div>
                  <div className="attachment-label">
                    <div className="label-title">
                      <CIcon name="cil-paperclip" />
                      <div className="description">Tệp đính kèm</div>
                    </div>

                    <div className="label-action">
                      <CIcon name="cil-plus" />
                      <div className="action-name">Tải tệp lên</div>
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
                              <CIcon
                                name="cil-space-bar"
                                className="icon-bottom"
                              />
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
                      // onKeyDown={onAddComment}
                      // onChange={(e) => setCommentContent(e.target.value)}
                    />
                  </div>
                </div>
                <div className="comment-list">
                  {cmtLists.map((item) => {
                    return <CommentItem comment={item} key={item.commentId} />;
                  })}
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
          </CRow>
        </CModalBody>
      </CModal>
    </div>
  );
}

export default TaskEditModal;
