// import React from "react";
// import PropTypes from "prop-types";
// import "./Comment.scss";
// Comment.propTypes = {};

// function Comment(props) {
//   return (
//     <div className="comment">
//       <div className="author-avatar c-avatar">
//         <img
//           src={props.data.userAvatar}
//           className="c-avatar-img"
//           alt="avatar"
//         />
//       </div>
//       <div className="comment-content">
//         <div className="comment-content-header">
//           <div className="comment-author-name">{props.data.userName}</div>
//           <div className="comment-date">{props.data.commentCreatedAt}</div>
//         </div>
//         <div className="comment-content-text">{props.data.commentContent}</div>
//       </div>
//     </div>
//   );
// }

// export default Comment;

import React from "react";
import PropTypes from "prop-types";
import "./Comment.scss";
Comment.propTypes = {};

function Comment(props) {
  return (
    <div className="comment">
      <div className="author-avatar c-avatar">
        <img
          src={props.data.avatar}
          className="c-avatar-img"
          alt="admin@bootstrapmaster.com"
        />
      </div>
      <div className="comment-content">
        <div className="comment-content-header">
          <div className="comment-author-name">{props.data.username}</div>
          <div className="comment-date">{props.data.date}</div>
        </div>
        <div className="comment-content-text">{props.data.comment}</div>
      </div>
    </div>
  );
}

export default Comment;
