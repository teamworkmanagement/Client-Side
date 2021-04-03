import React from "react";
import PropTypes from "prop-types";
import "./LoadMore.scss";
LoadMore.propTypes = {};

function LoadMore(props) {
  return (
    <div className="load-more">
      <div>Xem thêm</div>
      <div class="rotate">&#171;</div>
    </div>
  );
}

export default LoadMore;
