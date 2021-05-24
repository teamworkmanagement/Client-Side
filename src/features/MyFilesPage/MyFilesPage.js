import React from "react";
import PropTypes from "prop-types";
import "./MyFilesPage.scss";
import MyFilesTable from "./Components/ListFileTable/MyFilesTable";

MyFilesPage.propTypes = {};

function MyFilesPage(props) {
  return (
    <div className="my-files-page-container">
      <MyFilesTable />
    </div>
  );
}

export default MyFilesPage;
