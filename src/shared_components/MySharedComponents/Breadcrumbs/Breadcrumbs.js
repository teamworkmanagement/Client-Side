import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Breadcrumbs.scss";
import { useHistory } from "react-router-dom";

Breadcrumbs.propTypes = {};

function Breadcrumbs(props) {
  const history = useHistory();
  useEffect(() => {
    console.log(history.location);
  }, [history.location]);
  return <div className="breadcrumbs-container">a</div>;
}

export default Breadcrumbs;
