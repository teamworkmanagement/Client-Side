import CIcon from "@coreui/icons-react";
import { CDataTable, CTooltip } from "@coreui/react";
import { setTimeout } from "core-js";
import moment from "moment";
import "moment/locale/vi";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useRef, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { VscSearchStop, VscSymbolFile } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Prompt, useParams } from "react-router";
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

function ListFileTable(props) {
  const tableContainerRef = useRef(null);

  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [datas, setDatas] = useState([]);
  //eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [cfile, setCfile] = useState(null); //current file
  //eslint-disable-next-line
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const [triggerLoad, setTriggerLoad] = useState(0); //call api khi thêm file...
  const [showError, setShowError] = useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const pickerRef = useRef(null);
  const maxSize = 30; //MB

  const { teamId } = useParams();

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
      } catch (err) {}
    }
    getDatas();
  }, [page, triggerLoad]);

  useEffect(() => {
    setShowExitPrompt(upload);
  }, [upload]);

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
    fileApi
      .copyFile({
        userId: user.id,
        fileId: item.id,
      })
      .then((res) => {
        toast(
          <CustomToast type="success" title="Thông báo" message="Thành công!" />
        );
      })
      .catch((err) => {});
  };
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

                  <CTooltip placement="top" content="Lưu vào tệp của tôi">
                    <div
                      className="share-btn-container"
                      onClick={() => copyFile(item)}
                    >
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
