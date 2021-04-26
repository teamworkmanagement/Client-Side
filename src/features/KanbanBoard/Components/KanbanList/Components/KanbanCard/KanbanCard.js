import React, { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.scss";
import {
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

KanbanCard.propTypes = {};

function KanbanCard(props) {
  const initIsShowEditPopup = false;
  const [isShowEditPopup, setIsShowEditPopup] = useState(initIsShowEditPopup);
  const files = useSelector((state) => state.app.files);
  const handleTasks = useSelector((state) => state.app.handleTasks);
  const users = useSelector((state) => state.app.users);
  const imageCard = getCardImage();
  const attachmentsCount = getAttachmentsCount();
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

  function handleKeyDown(e) {
    const limit = 80;

    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  function openEditPopup() {
    setIsShowEditPopup(true);
  }

  function removeYearOfDate(date) {
    if (new Date().getFullYear() === date.getFullYear()) {
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

  function getCardImage() {
    //debugger;

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].fileBelongedId === props.data.taskId &&
        files[i].fileType === "image"
      ) {
        return files[i].fileUrl;
      }
    }
    return false;
  }
  function getAttachmentsCount() {
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      if (files[i].fileBelongedId === props.data.taskId) {
        count++;
      }
    }
    return count;
  }

  return (
    <Draggable draggableId={props.data.taskId} index={props.index}>
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
                    <div className="task-progress">25%</div>
                  </div>

                  <div className="task-status-dropdown">
                    <CDropdown>
                      <CDropdownToggle id="dropdownMenuButton" caret>
                        Đang thực hiện
                      </CDropdownToggle>
                      <CDropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        placement="bottom-end"
                      >
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here</CDropdownItem>
                        <CDropdownItem divider />
                        <CDropdownItem>Separated link</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
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
                        />
                      </div>
                      <div className="card-divider"></div>
                      <div className="infor-bar">
                        <div className="assign-group item-group">
                          <div className="assign-label label">
                            <CIcon name="cil-user-follow" />
                            Giao cho
                          </div>
                          <div className="assigned-user-avatar">
                            <img
                              src="https://emilus.themenate.net/img/avatars/thumb-2.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="due-group item-group">
                          <div className="due-label label">
                            <CIcon name="cil-clock" />
                            Hạn hoàn thành
                          </div>
                          <div className="due-date">
                            <CInput
                              type="date"
                              id="date-from"
                              name="date-input"
                              placeholder="date"
                            />
                          </div>
                        </div>

                        <div className="theme-group item-group">
                          <div className="theme-label label">
                            <CIcon name="cil-color-palette" />
                            Màu chủ đề
                          </div>
                          <div className="theme-color"></div>
                        </div>
                        <div className="progress-group item-group">
                          <div className="progress-label label">
                            <CIcon name="cil-chart-line" />
                            Tiến độ
                          </div>
                          <CProgress animated value={25} />
                        </div>
                        <div className="status-group item-group">
                          <div className="status-label label">
                            <CIcon name="cil-task" />
                            Trạng thái
                          </div>
                          <div className="task-status-dropdown status-infor">
                            <CDropdown>
                              <CDropdownToggle id="dropdownMenuButton" caret>
                                Đang thực hiện
                              </CDropdownToggle>
                              <CDropdownMenu
                                aria-labelledby="dropdownMenuButton"
                                placement="bottom-end"
                              >
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>
                                  Something else here
                                </CDropdownItem>
                                <CDropdownItem divider />
                                <CDropdownItem>Separated link</CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
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
                        <CIcon name="cil-delete" />
                        <div className="action-name">Xóa công việc</div>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </CModalBody>
            </CModal>
          </div>

          <div className="card-component" onClick={openEditPopup}>
            {imageCard && (
              <div className="card-image-label">
                <img alt="" src={imageCard} />
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
                  <div className="comment-count">12</div>
                </div>
                {attachmentsCount > 0 && (
                  <div className="attachment-infor">
                    <div className="attachment-icon">
                      <CIcon name="cil-paperclip" />
                    </div>
                    <div className="attachment-count">{attachmentsCount}</div>
                  </div>
                )}
              </div>

              <div className="user-assign-avatar">
                <img alt="avatar" src={assignedUserImage} />
              </div>
            </div>
            <div className="card-progress">
              <CProgress
                color="success"
                animated
                value={props.data.taskCompletedPercent}
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
