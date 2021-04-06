import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./CommentList.scss";
import Comment from "../Comment/Comment";
import commentApi from "src/api/commentApi";
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

  const [cmtLists, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const comments = await commentApi.getAllCommentForPost(props.postId);
      console.log(comments);
      setComments(comments.data);
    }

    getComments();
  }, []);

  return (
    <div>
    <div className="comment-list">
      {cmtLists.map(function (item, index) {
        return <Comment key={index} data={item} />;
      })}
      
    </div>
    <div className="load-more">
      <div>Xem thêm</div>
      <div className="rotate">&#171;</div>
    </div>
    </div>
    
  );
}

export default CommentList;
