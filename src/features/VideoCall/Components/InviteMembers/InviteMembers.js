import React, { useEffect, useState } from "react";
import { CInput, CModal, CModalBody, CModalHeader } from "@coreui/react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";

import { useDispatch, useSelector } from "react-redux";
import userApi from "src/api/userApi";
import "./InviteMembers.scss";
import meetingApi from "src/api/meetingApi";

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
        <img alt="" height={20} width={20} src={props.data.img} />
        <label>{props.data.label}</label>
      </div>
    </components.Option>
  );
};

function InviteMembers(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [options, setOptions] = useState(null);
  const [inputValue, setInputValue] = useState('');

  function handleOnClose() {
    props.onCLoseModal();
  }

  const handleInputChange = (e) => {
    console.log(e);
    setInputValue(e);
  };

  const filterColors = async (inputValue) => {
    try {
      const params = {
        meetingId: props.meetingId,
        keyword: inputValue,
      };
      const res = await userApi.searchInviteMeeting({ params });

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

  const onInviteMembers = async () => {
    console.log(options);

    const members = options.map((option) => {
      return option.value;
    });

    meetingApi.inviteUsers({
      meetingId: props.meetingId,
      userIds: members,
    }).then(res => {

    }).catch(err => {

    })

    props.onCLoseModal();
  };

  const onChange = (e) => {
    setOptions(e);
  };

  return (
    <CModal
      className="create-chat-in-chat-page"
      show={props.showInviteMembers}
      onClose={handleOnClose}
      size="sm"
    >
      <CModalHeader closeButton>Mời thành viên</CModalHeader>
      <CModalBody className="new-card-form">
        <div style={{ width: "21rem" }}>
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
          />
          <div onClick={onInviteMembers} className="create-chat-btn">
            Mời
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default InviteMembers;