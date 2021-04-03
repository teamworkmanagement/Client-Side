import React from "react";
import PropTypes from "prop-types";
import "./CommentList.scss";
import Comment from "../Comment/Comment";
CommentList.propTypes = {};

function CommentList(props) {
  const commentList = [
    {
      avatar: "avatars/2.jpg",
      username: "Lê Anh Sơn",
      comment: "Cả đời dài thế nào?",
      date: "15/03/2021",
    },
    {
      avatar: "avatars/3.jpg",
      username: "Lâm Ngọc",
      comment: "Sự khởi đầu của đam mỹ",
      date: "16/03/2021",
    },
    {
      avatar: "avatars/4.jpg",
      username: "Khoa Ng",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      date: "16/04/2021",
    },
  ];
  return (
    <div className="comment-list">
      {commentList.map(function (item, index) {
        return <Comment key={index} data={item} />;
      })}
    </div>
  );
}

export default CommentList;
