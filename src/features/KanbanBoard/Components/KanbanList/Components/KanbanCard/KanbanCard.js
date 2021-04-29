import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.scss";
import {
  CButton,
  CCol,
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { CirclePicker } from "react-color";
import taskApi from "src/api/taskApi";

KanbanCard.propTypes = {};

function KanbanCard(props) {
  const initIsShowEditPopup = false;

  const [isShowEditPopup, setIsShowEditPopup] = useState(initIsShowEditPopup);
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const [modalTask, setModaTask] = useState(null);


  function handleKeyDown(e) {
    const limit = 80;

    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  const openEditPopup = async () => {
    const taskModal = await taskApi.getTaskById(props.data.taskId);
    setModaTask(taskModal.data);
    setIsShowEditPopup(true);
  }

  /*useEffect(() => {
    if (modalTask === null)
      return;
    setIsShowEditPopup(true);
  }, [modalTask]);*/

  function removeYearOfDate(date) {

    var dt = new Date(date);

    if (new Date().getFullYear() === dt.getFullYear()) {
      return moment(date).format("DD/MM");
    }
    return moment(date).format("DD/MM/YYYY");
  }

  function getStatusText(status) {
    switch (status) {
      case "todo":
        return "Đang chờ";
      case "doing":
        return "Đang thực hiện";
      default:
        return "Hoàn thành";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "todo":
        return {
          backgroundColor: "#DE4436",
        };
      case "doing":
        return {
          backgroundColor: "#FFC542",
        };
      default:
        return {
          backgroundColor: "#04D182",
        };
    }
  }

  function getProgressColor(progress) {
    if (progress < 26) {
      return "danger";
    }
    if (progress < 51) {
      return "warning";
    }
    if (progress < 76) {
      return "info";
    }
    return "success";
  }

  return (
    <Draggable
      isDragDisabled={isShowEditPopup}
      draggableId={props.data.taskId}
      index={props.index}
    >
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <CModal
              show={isShowEditPopup}
              onClose={() => setIsShowEditPopup(!isShowEditPopup)}
              size="lg"
            >
              <CModalHeader closeButton>
                <div className="card-labels">
                  <div className="progress-label">
                    <div className="progress-icon">
                      <CIcon name="cil-chart-line" />
                    </div>
                    <div className="task-progress">{modalTask?.taskCompletedPercent}%</div>
                  </div>

                  <div className="task-status-label-header">{modalTask?.taskStatus}</div>
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
                          value={modalTask?.taskName}
                        />
                      </div>
                      <div className="card-divider"></div>
                      <div className="infor-bar">
                        <CRow className="my-row">
                          <CCol className="col-6 my-col left">
                            <div className="assign-group item-group">
                              <div className="assign-label label">
                                <CIcon name="cil-user-follow" />
                                Giao cho
                              </div>
                              <div className="assigned-user-avatar">
                                <img
                                  src={modalTask?.userAvatar}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="theme-group item-group">
                              <div className="theme-label label">
                                <CIcon name="cil-color-palette" />
                                Màu chủ đề
                              </div>
                              <button
                                className="theme-color toggle-color-picker"
                                onBlur={() => {
                                  setIsShowColorPicker(false);
                                }}
                                onClick={() =>
                                  setIsShowColorPicker(!isShowColorPicker)
                                }
                              >
                                {isShowColorPicker ? <CirclePicker /> : null}
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
                                  value={modalTask?.taskDeadline}
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
                                    caret
                                  >
                                    {modalTask?.taskStatus}
                                  </CDropdownToggle>
                                  <CDropdownMenu
                                    aria-labelledby="dropdownMenuButton"
                                    placement="bottom-end"
                                  >
                                    <CDropdownItem className="todo-status">
                                      <div className="color-dot"></div>
                                      Đang chờ
                                    </CDropdownItem>
                                    <CDropdownItem className="doing-status">
                                      <div className="color-dot"></div>
                                      Đang thực hiện
                                    </CDropdownItem>
                                    <CDropdownItem className="done-status">
                                      <div className="color-dot"></div>
                                      Hoàn thành
                                    </CDropdownItem>
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
                          <CProgress animated value={modalTask?.taskCompletedPercent} />
                        </div>
                      </div>

                      <div className="card-divider"></div>
                      <div className="attachment-label">
                        <CIcon name="cil-paperclip" />
                        <div className="description">Tệp đính kèm</div>
                      </div>
                      <div className="list-attachments">
                        <div className="attachment-item">
                          <img
                            src="https://emilus.themenate.net/img/others/img-13.jpg"
                            alt=""
                          />
                        </div>
                        <div className="attachment-item">
                          <img
                            src="https://emilus.themenate.net/img/others/img-14.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-divider"></div>

                      <div className="description-label">
                        <CIcon name="cil-description" />
                        <div className="description">Chi tiết</div>
                      </div>
                      <div className="description-input-container">
                        <CTextarea
                          onKeyDown={handleKeyDown}
                          name="textarea-input"
                          id="textarea-input"
                          rows="9"
                          placeholder="Mô tả công việc..."
                          autocomplete="off"
                          value={modalTask?.taskDescription}
                        />
                      </div>
                      <div className="comment-label">
                        <CIcon name="cil-speech" />
                        <div className="commnet">Bình luận</div>
                      </div>
                      {/* <MyComment /> 
                        <div className="comment-list">
                          {commentList.map(function (item, index) {
                            return <Comment key={index} data={item} />;
                          })}
                        </div>*/}
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

          <div
            className="card-component"
            style={{ animationDelay: `${props.index / 10}s` }}
            onClick={openEditPopup}
          >
            {props.data.image && (
              <div className="card-image-label">
                <img alt="" src={props.data.image} />
              </div>
            )}

            <div className="card-header">
              <div className="title">{props.data.taskName}</div>
            </div>
            <div className="card-labels">
              <div className="deadline">
                <div className="deadline-icon">
                  <CIcon name="cil-calendar" />
                </div>
                <div className="date">
                  {removeYearOfDate(props.data.taskDeadline)}
                </div>
              </div>
              <div
                style={getStatusColor(props.data.taskStatus)}
                className="card-status"
              >
                {getStatusText(props.data.taskStatus)}
              </div>
            </div>
            <div className="card-infor">
              <div className="infor-group">
                <div className="comment-infor">
                  <div className="comment-icon">
                    <CIcon name="cil-speech" />
                  </div>
                  <div className="comment-count">{props.data.commentsCount}</div>
                </div>
                {props.data.filesCount > 0 && (
                  <div className="attachment-infor">
                    <div className="attachment-icon">
                      <CIcon name="cil-paperclip" />
                    </div>
                    <div className="attachment-count">{props.data.filesCount}</div>
                  </div>
                )}
              </div>

              <div className="user-assign-avatar">
                <img alt="avatar" src={props.data.userAvatar} />
              </div>
            </div>
            <div className="card-progress">
              <CProgress
                color={getProgressColor(props.data.taskCompletedPercent)}
                animated
                value={props.data.taskCompletedPercent + 2}
              />
              <div className="progress-text">
                {props.data.taskCompletedPercent}%
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanCard;

//bỏ đi mycomment+commentlist tạm thời
