import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./StartChatMembers.scss";
import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";

import { useDispatch, useSelector } from "react-redux";
import userApi from "src/api/userApi";
import chatApi from "src/api/chatApi";

StartChatMembers.propTypes = {};

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

function StartChatMembers(props) {
  const dispatch = useDispatch();

  const [grChatName, setGrChatName] = useState("");
  const [options, setOptions] = useState([]);
  const user = useSelector((state) => state.auth.currentUser);

  function handleOnClose() {
    if (props.onModalClose) {
      setGrChatName("");
      props.onModalClose();
    }
  }

  useEffect(() => { }, []);

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
      };
      const res = await userApi.searchUser({ params });

      console.log(res.data);

      return res.data.map((x) => {
        return {
          value: x.userId,
          label: x.userFullname,
          img: x.userImageUrl,
        };
      });
    } catch (err) { }
  };

  const loadOptions = async (inputValue, callback) => {
    callback(await filterColors(inputValue));
  };

  const onCreateGroupChat = async () => {
    console.log(options);
    console.log(grChatName);
    const members = options.map((option) => {
      return option.value;
    });

    setGrChatName("");
    setOptions([]);

    if (!grChatName && members.length > 2) {
      alert("name empty");
      return;
    }

    try {
      const res = await chatApi.addChatWithMembers({
        members: members,
        groupChatName: grChatName,
      });

      props.onModalClose(res.data);
    } catch (err) {
      props.onModalClose();
    }
  };

  /*const onChange = (e) => {
    setOptions(e);
  };*/

  const onChange = (e, { action, removedValue }) => {

    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
    }

    setOptions(e);
  };

  const onInputGrChatName = (e) => {
    setGrChatName(e.target.value);
  };

  useEffect(() => {
    if (props.fixedMembers) {
      console.log(props.fixedMembers);
      setOptions(props.fixedMembers);
    }
  }, [props.fixedMembers]);

  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
  };

  return (
    <CModal
      className="create-chat-with-member-modal"
      show={props.showStartChat}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Tạo nhóm chat mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div style={{ width: "21rem" }}>
          <CInput
            type="text"
            placeholder="Tên nhóm chat"
            value={grChatName}
            onChange={onInputGrChatName}
          />
          <AsyncSelect
            value={options}
            className="select-css"
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onChange={onChange}
            onInputChange={handleInputChange}
            isMulti
            isClearable={false}
            components={{
              Option: CustomOption,
              MultiValue: ValueOption,
            }}
            styles={styles}
          />
          <div onClick={onCreateGroupChat} className="create-chat-btn">
            Tạo nhóm Chat
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default StartChatMembers;
