import React, { useEffect, useState } from "react";
import "./AddMembers.scss";
import { CModal, CModalBody, CModalHeader } from "@coreui/react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";

import { useDispatch, useSelector } from "react-redux";
import userApi from "src/api/userApi";
import chatApi from "src/api/chatApi";
import {
  setCurrentGroup,
  setIsSelected,
} from "src/features/ChatPage/chatSlice";

const ValueOption = (props) => (
  <components.MultiValue {...props}>
    <div style={{ display: "flex", marginTop: "auto", marginBottom: "auto" }}>
      <img src={props.data.img} style={{ width: 30 }} alt="" />
      <span style={{ marginTop: "auto", marginBottom: "auto" }}>
        {props.data.label}
      </span>
    </div>
  </components.MultiValue>
);

export const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          marginBottom: "auto",
          justifyContent: "space-between",
        }}
      >
        <img height={20} width={20} src={props.data.img} />
        <label>{props.data.label}</label>
      </div>
    </components.Option>
  );
};

function AddMembers(props) {
  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => state.chat.currentGroup);

  const user = useSelector((state) => state.auth.currentUser);
  const [options, setOptions] = useState([]);

  function handleOnClose() {
    setOptions([]);
    props.onCLoseModal();
  }

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    console.log(e);
    setInputValue(e);
  };

  const filterColors = async (inputValue) => {
    try {
      const params = {
        userId: user.id,
        keyword: inputValue,
        groupChatId: currentGroup,
      };
      const res = await userApi.searchAddUserChatExists({ params });

      console.log(res.data);

      return res.data.map((x) => {
        return {
          value: x.userId,
          label: x.userFullname,
          img: x.userImageUrl,
        };
      });
    } catch (err) {}
  };

  const loadOptions = async (inputValue, callback) => {
    callback(await filterColors(inputValue));
  };

  const onAddMembers = async () => {
    console.log(options);
    if (options.length === 0) return;

    chatApi
      .addMembers({
        groupChatId: currentGroup,
        userIds: options.map((x) => x.value),
      })
      .then((res) => {
        dispatch(setIsSelected(true));
        dispatch(setCurrentGroup(res.data));
        setOptions([]);
        props.onCLoseModal();
      })
      .catch((err) => {});
    //props.onCLoseModal();
  };

  const onChange = (e) => {
    setOptions(e);
  };
  const onInputGrChatName = (e) => {};
  return (
    <CModal
      className="add-member-modal"
      show={props.showAddMembers}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Thêm thành viên vào nhóm chat</CModalHeader>
      <CModalBody className="new-card-form">
        <div style={{ width: "21rem" }}>
          <AsyncSelect
            value={options}
            className="select-css"
            loadOptions={loadOptions}
            defaultOptions
            onChange={onChange}
            onInputChange={handleInputChange}
            isMulti
            components={{
              Option: CustomOption,
              MultiValue: ValueOption,
            }}
          />
          <div onClick={onAddMembers} className="create-chat-btn">
            Thêm thành viên
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default AddMembers;
