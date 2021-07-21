import React from "react";
import "./CommentItem.scss";
import moment from "moment";
import "moment/locale/vi";
import Tag from "../Tag/Tag";
import AvatarImage from "src/shared_components/MySharedComponents/AvatarComponent/Components/AvatarImage/AvatarImage";
import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

moment.locale("vi");

function CommentItem({ comment }) {
  const mapStringToJsx = (str, comment) => {
    console.log(comment);
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
        <div className="comment-content">
          {mapStringToJsx(comment.commentContent, comment)}
        </div>
      </div>
      <div className="comment-actions">
        <div className="post-header-actions-dropdown">
          <CDropdown>
            <CDropdownToggle id="dropdownMenuButton" caret>
              <div className="lane-actions">
                <CIcon name="cil-options" className="rotate-90" />
              </div>
            </CDropdownToggle>
            <CDropdownMenu
              aria-labelledby="dropdownMenuButton"
              placement="bottom-end"
            >
              <CDropdownItem className="first">
                <CIcon name="cil-flag-alt" />
                Báo cáo
              </CDropdownItem>

              <CDropdownItem className="last">
                <CIcon name="cil-trash" className="icon-delete" />
                Xóa
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
