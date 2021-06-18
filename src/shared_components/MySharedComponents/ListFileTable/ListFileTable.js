import CIcon from "@coreui/icons-react";
import { CDataTable, CPagination, CTooltip } from "@coreui/react";
import { setTimeout } from "core-js";
import moment from "moment";
import "moment/locale/vi";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { CgSoftwareUpload } from "react-icons/cg";
import { VscSearchStop, VscSymbolFile } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Prompt, useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import fileApi from "src/api/fileApi";
import { myBucket } from "src/utils/aws/config";
import { GetFileTypeImage, GetTypeFromExt } from "src/utils/file";
import uuid from "src/utils/file/uuid";
import useExitPrompt from "../../../utils/customHook/useExitPrompt";
import CustomToast from "../CustomToast/CustomToast";
import "./ListFileTable.scss";
import UploadItem from "./ProgressBottom/UploadItem";

moment.locale("vi");
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
      id: 51,
      name: "Notes.rar",
      createdAt: "20/12/2020",
      size: "1MB",
      owner: "Nguyễn Thanh",
      type: "png",
      ownerImageURL: "avatars/6.jpg",
      downloadIcon: "images/download.png",
    },
    {
      id: 542,
      name: "Báo cáo.docx",
      createdAt: "18/12/2021",
      size: "10MB",
      owner: "Nguyễn Thanh",
      type: "Word",
      ownerImageURL: "avatars/5.jpg",
    },
    {
      id: 83,
      name: "Thuyết trình .ptpx",
      createdAt: "21/01/2020",
      size: "107KB",
      owner: "Nguyễn Khoa",
      type: "PowerPoint",
      ownerImageURL: "avatars/4.jpg",
    },
    {
      id: 44,
      name: "Khóa luận.txt",
      createdAt: "20/21/2021",
      size: "2MB",
      owner: "Nguyễn Dũng",
      type: "Text",
      ownerImageURL: "avatars/3.jpg",
    },
    {
      id: 35,
      name: "Hello.zip",
      createdAt: "14/03/2021",
      size: "15GB",
      owner: "Khoa Ng",
      type: "Zip",
      ownerImageURL: "avatars/2.jpg",
    },
    {
      id: 96,
      name: "Musics.rar",
      createdAt: "12/04/2020",
      size: "1.1GB",
      owner: "Khoa Ng",
      type: "Exe",
      ownerImageURL: "avatars/1.jpg",
    },
    {
      id: 351,
      name: "Notes.rar",
      createdAt: "20/12/2020",
      size: "1MB",
      owner: "Nguyễn Thanh",
      type: "png",
      ownerImageURL: "avatars/6.jpg",
      downloadIcon: "images/download.png",
    },
    {
      id: 3542,
      name: "Báo cáo.docx",
      createdAt: "18/12/2021",
      size: "10MB",
      owner: "Nguyễn Thanh",
      type: "Word",
      ownerImageURL: "avatars/5.jpg",
    },
    {
      id: 383,
      name: "Thuyết trình .ptpx",
      createdAt: "21/01/2020",
      size: "107KB",
      owner: "Nguyễn Khoa",
      type: "PowerPoint",
      ownerImageURL: "avatars/4.jpg",
    },
    {
      id: 344,
      name: "Khóa luận.txt",
      createdAt: "20/21/2021",
      size: "2MB",
      owner: "Nguyễn Dũng",
      type: "Text",
      ownerImageURL: "avatars/3.jpg",
    },
    {
      id: 335,
      name: "Hello.zip",
      createdAt: "14/03/2021",
      size: "15GB",
      owner: "Khoa Ng",
      type: "Zip",
      ownerImageURL: "avatars/2.jpg",
    },
    {
      id: 396,
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
  const [fail, setFail] = useState(false);
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [datas, setDatas] = useState([]);
  const [totals, setTotals] = useState(0);
  const [page, setPage] = useState(1);
  const [cfile, setCfile] = useState(null); //current file
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const [triggerLoad, setTriggerLoad] = useState(0); //call api khi thêm file...
  const [showError, setShowError] = useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const pickerRef = useRef(null);
  const history = useHistory();
  const pageSize = 5;
  const maxSize = 30; //MB

  const { teamId } = useParams();

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
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  const onClick = () => {
    if (!upload) pickerRef.current.click();
  };

  const onPick = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size / 1024 / 1024 >= maxSize) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
        return;
      }

      const folder = uuid();
      const params = {
        Body: file,
        Bucket: "teamappstorage",
        Key: `${folder}/${file.name}`,
      };

      setUpload(true);
      setCfile(file);

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          let pro = Math.round((evt.loaded / evt.total) * 100);
          setProgress(pro);

          if (pro >= 100) {
            const body = {
              fileName: file.name,
              fileUrl: `https://teamappstorage.s3-ap-southeast-1.amazonaws.com/${folder}/${file.name}`,
              fileType: GetTypeFromExt(file.name),
              fileUserUploadId: user.id,
              fileTeamOwnerId: teamId,
              fileSize: file.size,
            };

            fileApi
              .addFile(body)
              .then((res) => {
                setUpload(false);
                setTriggerLoad(triggerLoad + 1);
              })
              .catch((err) => {
                setUpload(false);
              });
          }
        })
        .send((err) => {
          if (err) {
            console.log(err);
            setUpload(false);
          }
        });
    }
  };

  //pagination
  useEffect(() => {
    async function getDatas() {
      try {
        const params = {
          OwnerId: teamId,
          OwnerType: "team",
        };
        //const outPut = await fileApi.getFile({ params });

        const outPut = await fileApi.getAll({ params });

        const dts = outPut.data.map((f) => {
          return {
            id: f.fileId,
            name: f.fileName,
            createdAt: f.fileUploadTime,
            size: f.fileSize,
            owner: f.fileUserUploadName,
            type: f.fileType,
            ownerImageURL: f.userImage,
            downloadIcon: "../images/download.png",
            fileUrl: f.fileUrl,
          };
        });

        setDatas(dts);
        //setTotals(Math.ceil(outPut.data.totalRecords / pageSize));
        //console.log(outPut.data.items);
      } catch (err) { }
    }
    getDatas();
  }, [page, triggerLoad]);

  useEffect(() => {
    setShowExitPrompt(upload);
  }, [upload]);

  const setActivePage = (i) => {
    if (i !== 0) setPage(i);
  };

  function NoItemView() {
    return (
      <div className="no-item-view-table">
        <div className="nodata-image">
          <div className="icon-group">
            <VscSymbolFile className="icon-task" />
            <VscSearchStop className="icon-search" />
          </div>

          <div className="noti-infor">Chưa có tệp nào trong nhóm</div>
          <div className="create-btn">Tải tệp mới lên</div>
        </div>
      </div>
    );
  }

  const copyFile = (item) => {
    console.log(item);
    fileApi.copyFile({
      userId: user.id,
      fileId: item.id,
    }).then(res => {
      toast(<CustomToast
        type="success"
        title="Thông báo"
        message="Thành công!" />)
    }).catch(err => {

    })
  }
  return (
    <div ref={tableContainerRef} className="list-file-table-container">
      <div onClick={onClick} className="upload-container">
        <CgSoftwareUpload className="icon-upload" />
        <div>Tải tệp lên nhóm</div>
        <input
          onChange={onPick}
          ref={pickerRef}
          type="file"
          style={{ display: "none" }}
        />
      </div>
      <label className="mt-2 text-danger">
        *Dung lượng mỗi file không quá 30MB.
      </label>
      <CDataTable
        items={datas}
        fields={fields}
        columnFilter
        //tableFilter
        //itemsPerPageSelect
        noItemsViewSlot={NoItemView()}
        pagination
        itemsPerPage={5}
        hover
        sorter
        scopedSlots={{
          name: (item) => {
            return (
              <td>
                <div className="file-name">{item.name}</div>
              </td>
            );
          },
          createdAt: (item) => {
            return (
              <td>
                <div>{moment(item.createdAt).format("DD/MM/YYYY")}</div>
              </td>
            );
          },
          size: (item) => {
            return (
              <td>
                <div>{prettyBytes(item.size, { locale: "vi" })}</div>
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
                <div className="actions-group">
                  <CTooltip placement="top" content="Tải về">
                    <div className="download-btn-container">
                      <a href={item.fileUrl}>
                        {/* <img
                      className="download-btn"
                      src={"../images/download.png"}
                      alt=""
                      onClick={handleDownload}
                    ></img> */}
                        <div className="download-btn">
                          <div className="overlay-div"></div>
                          <CIcon
                            name="cil-arrow-bottom"
                            className="arrow-icon"
                          />
                          <CIcon name="cil-space-bar" />
                        </div>
                      </a>
                    </div>
                  </CTooltip>

                  <CTooltip placement="top" content="Lưu vào tệp của tôi" >
                    <div className="share-btn-container" onClick={() => copyFile(item)}>
                      <CIcon name="cil-share-all" />
                    </div>
                  </CTooltip>
                </div>
              </td>
            );
          },
        }}
      />
      {/*totals !== 0 ? (
        <CPagination
          className="pagination-team-files"
          activePage={page}
          pages={totals}
          dots
          align="center"
          doubleArrows={false}
          onActivePageChange={(i) => setActivePage(i)}
        />
      ) : null*/}

      {upload ? <UploadItem progress={progress} name={cfile.name} /> : null}
      <Prompt when={upload} message="Cancel uploading file?" />
      {showError ? (
        <div id="snackbar">Dung lượng file lớn hơn 30MB!</div>
      ) : null}
    </div>
  );
}

export default ListFileTable;
