import React from "react";
import "./CommentItem.scss";
import moment from "moment";
import "moment/locale/vi";
import Tag from "../Tag/Tag";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import commentApi from "src/api/commentApi";
import { toast } from "react-toastify";
import CustomToast from "src/shared_components/MySharedComponents/CustomToast/CustomToast";

moment.locale("vi");

function CommentItem({ comment }) {
  const user = useSelector(state => state.auth.currentUser);
  const mapStringToJsx = (str, comment) => {
    const myArr = str.split("<@tag>");
    return myArr.map((ele, index) => {
      if (index % 2 === 0) {
        return (
          <div
            className="normal-text-comment"
            dangerouslySetInnerHTML={{ __html: ele }}
          ></div>
        );
      } else {
        return (
          <Tag
            userId={ele}
            taskId={comment.commentTaskId}
            postId={comment.commentPostId}
          />
        );
      }
    });
  };

  const onReportComment = () => {
    console.log('report comment: ', comment.commentId);
    commentApi.reportComment({
      commentId: comment.commentId
    }).then(res => {
      toast(
        <CustomToast
          type="success"
          title="Thông báo"
          message="Báo cáo thành công!"
        />)
    }).catch(err => {
      if (err.ErrorCode && err.ErrorCode === '409') {
        toast(
          <CustomToast
            type="error"
            title="Lỗi"
            message="Bạn đã báo cáo nội dung này!"
          />);
        return;
      }
      toast(
        <CustomToast
          type="error"
          title="Lỗi"
          message="Có lỗi xảy ra!"
        />)
    })
  }
  return (
    <div className="comment-item-container">
      <div className="commenter-avatar">
        {/*<img alt="" src={comment.userAvatar} />*/}
        <AvatarImage
          userName={comment.userName}
          userImage={comment.userAvatar}
          userId={comment.commentUserId}
          disable={false}
        />
      </div>
      <div className="comment-infor">
        <div className="comment-header">
          <div className="commenter-name">{comment.userName}</div>
          <div className="comment-date">
            {moment(comment.commentCreatedAt).format("l")}
          </div>
        </div>
        <div className="comment-content" >
          {mapStringToJsx(comment.commentContent, comment)}
        </div>
        {comment.commentUserId !== user.id && <div onClick={onReportComment} className="comment-footer">
          <CIcon name="cil-flag-alt" />
          Báo cáo
        </div>}
      </div>
    </div>
  );
}

export default CommentItem;
