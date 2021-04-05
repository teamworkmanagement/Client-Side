import React from "react";
import PropTypes from "prop-types";
import { cilHeart, cisHeart } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import "./ContentToolBar.scss";

ContentToolBar.propTypes = {};

function ContentToolBar(props) {
  return (
    <div className="content-tool-bar">
      <CIcon name="cil-heart" />
      <div className="heart-count count">12</div>

      <CIcon name="cil-comment-bubble" />
      <div className="comment-count count">12</div>
    </div>
  );
}

export default ContentToolBar;
