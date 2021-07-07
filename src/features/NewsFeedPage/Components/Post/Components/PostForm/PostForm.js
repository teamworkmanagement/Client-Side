import React from "react";
import "./PostForm.scss";
import TextareaAutosize from "react-textarea-autosize";

function PostForm(props) {
  return (
    <div className="post-form-container">
      <TextareaAutosize
        className="input-post"
        minRows={3}
        maxRows={20}
        placeholder="Nội dung bài viết..."
      />

      <div className="submit-btn">Đăng bài</div>
    </div>
  );
}

export default PostForm;
