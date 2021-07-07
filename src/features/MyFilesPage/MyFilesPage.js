import React from "react";
import "./MyFilesPage.scss";
import MyFilesTable from "./Components/ListFileTable/MyFilesTable";

function MyFilesPage(props) {
  return (
    <div className="my-files-page-container">
      <MyFilesTable />
    </div>
  );
}

export default MyFilesPage;
