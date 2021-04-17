import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./ListFileTable.scss";
import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import reactDom from "react-dom";

ListFileTable.propTypes = {};

function ListFileTable(props) {
  const usersData = [
    {
      id: 0,
      name: "John Doe",
      registered: "2018/01/01",
      role: "Guest",
      status: "Pending",
    },
    {
      id: 1,
      name: "Samppa Nori",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 2,
      name: "Estavan Lykos",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 3,
      name: "Chetan Mohamed",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Derick Maximinus",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 5,
      name: "Friderik Dávid",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 6,
      name: "Yiorgos Avraamu",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 7,
      name: "Avram Tarasios",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 8,
      name: "Quintin Ed",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Enéas Kwadwo",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 10,
      name: "Agapetus Tadeáš",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 11,
      name: "Carwyn Fachtna",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 12,
      name: "Nehemiah Tatius",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 13,
      name: "Ebbe Gemariah",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 14,
      name: "Eustorgios Amulius",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 15,
      name: "Leopold Gáspár",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 16,
      name: "Pompeius René",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 17,
      name: "Paĉjo Jadon",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 18,
      name: "Micheal Mercurius",
      registered: "2018/02/01",
      role: "Admin",
      status: "Inactive",
    },
    {
      id: 19,
      name: "Ganesha Dubhghall",
      registered: "2018/03/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 20,
      name: "Hiroto Šimun",
      registered: "2018/01/21",
      role: "Staff",
      status: "Active",
    },
    {
      id: 21,
      name: "Vishnu Serghei",
      registered: "2018/01/01",
      role: "Member",
      status: "Active",
    },
    {
      id: 22,
      name: "Zbyněk Phoibos",
      registered: "2018/02/01",
      role: "Staff",
      status: "Banned",
    },
    {
      id: 23,
      name: "Aulus Agmundr",
      registered: "2018/01/01",
      role: "Member",
      status: "Pending",
    },
    {
      id: 42,
      name: "Ford Prefect",
      registered: "2001/05/25",
      role: "Alien",
      status: "Don't panic!",
    },
  ];

  const FilesData = [
    {
      id: 1,
      name: "Notes.rar",
      createdAt: "20/12/2020",
      size: "1MB",
      owner: "Nguyễn Thanh",
      type: "Png",
      ownerImageURL: "avatars/6.jpg",
      downloadIcon: "images/download.png",
    },
    {
      id: 2,
      name: "Báo cáo.docx",
      createdAt: "18/12/2021",
      size: "10MB",
      owner: "Nguyễn Thanh",
      type: "Word",
      ownerImageURL: "avatars/5.jpg",
    },
    {
      id: 3,
      name: "Thuyết trình .ptpx",
      createdAt: "21/01/2020",
      size: "107KB",
      owner: "Nguyễn Khoa",
      type: "PowerPoint",
      ownerImageURL: "avatars/4.jpg",
    },
    {
      id: 4,
      name: "Khóa luận.txt",
      createdAt: "20/21/2021",
      size: "2MB",
      owner: "Nguyễn Dũng",
      type: "Text",
      ownerImageURL: "avatars/3.jpg",
    },
    {
      id: 5,
      name: "Hello.zip",
      createdAt: "14/03/2021",
      size: "15GB",
      owner: "Khoa Ng",
      type: "Zip",
      ownerImageURL: "avatars/2.jpg",
    },
    {
      id: 6,
      name: "Musics.rar",
      createdAt: "12/04/2020",
      size: "1.1GB",
      owner: "Khoa Ng",
      type: "Exe",
      ownerImageURL: "avatars/1.jpg",
    },
  ];
  const tableContainerRef = useRef(null);
  // useEffect(() => {
  //   tableContainerRef.current.children[1].children[0].children[0].children[0].innerHTML =
  //     "Lọc:";
  //   tableContainerRef.current.children[1].children[0].children[1].children[0].children[0].innerHTML =
  //     "Số dòng:";
  // });

  const [details, setDetails] = useState([]);

  const handleDownload = (index) => {
    console.log("action in table");
    //setDetails();
  };

  const fields = [
    { key: "name", label: "Tên tệp", _style: { width: "30%" } },
    { key: "createdAt", label: "Ngày tải lên", _style: { width: "15%" } },
    { key: "size", label: "Kích thước", _style: { width: "15%" } },
    { key: "owner", label: "Người tải lên", _style: { width: "20%" } },
    { key: "type", label: "Loại", _style: { width: "10%" } },
    {
      key: "downloadAction",
      label: "Tải về",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  function GetFileTypeImage(file_type_name) {
    switch (file_type_name.toString().toLowerCase()) {
      case "word":
        return "images/file_type_icons/doc.png";
      case "excel":
        return "images/file_type_icons/xls.png";
      case "powerpoint":
        return "images/file_type_icons/ppt.png";
      case "video":
        return "images/file_type_icons/mp4.png";
      case "audio":
        return "images/file_type_icons/mp3.png";
      case "pdf":
        return "images/file_type_icons/pdf.png";
      case "zip":
        return "images/file_type_icons/zip.png";
      case "text":
        return "images/file_type_icons/txt.png";
      case "png":
        return "images/file_type_icons/png.png";
      case "css":
        return "images/file_type_icons/css.png";
      case "csv":
        return "images/file_type_icons/csv.png";
      case "exe":
        return "images/file_type_icons/exe.png";
      case "html":
        return "images/file_type_icons/html.png";
      case "javascript":
        return "images/file_type_icons/javascript.png";
      case "json":
        return "images/file_type_icons/json-file.png";
      case "svg":
        return "images/file_type_icons/svg.png";
      case "xml":
        return "images/file_type_icons/xml.png";
      default:
        return "file.png";
    }
  }

  return (
    <div ref={tableContainerRef} className="list-file-table-container">
      <div className="upload-container">
        <img className="upload-image" src={"images/upload.png"} alt="" />
        <div>Tải tệp lên nhóm</div>
      </div>
      <CDataTable
        items={FilesData}
        fields={fields}
        columnFilter
        //tableFilter
        //itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          name: (item) => {
            return (
              <td>
                <div className="file-name">{item.name}</div>
              </td>
            );
          },
          owner: (item) => {
            return (
              <td>
                <div className="owner">
                  <img
                    className="owner-image"
                    src={item.ownerImageURL}
                    alt=""
                  ></img>
                  <div className="owner-name">{item.owner}</div>
                </div>
              </td>
            );
          },
          type: (item) => {
            return (
              <td>
                <div className="type">
                  <img
                    className="type-image"
                    src={GetFileTypeImage(item.type)}
                    alt=""
                  ></img>
                  <div className="type-name">{item.type}</div>
                </div>
              </td>
            );
          },
          downloadAction: (item, index) => {
            return (
              <td>
                <div className="download-btn-container">
                  <img
                    className="download-btn"
                    src={"images/download.png"}
                    alt=""
                    onClick={handleDownload}
                  />
                </div>
              </td>
            );
          },
        }}
      />
    </div>
  );
}

export default ListFileTable;
