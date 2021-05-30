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
import AsyncSelect from 'react-select/async';

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
  const user = useSelector(state => state.auth.currentUser);

  function handleOnClose() {
    if (props.onModalClose) {
      setGrChatName("");
      props.onModalClose();
    }
  }

  useEffect(() => {

  }, []);


  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    console.log(e);
    setInputValue(e);
  }



  const filterColors = async (inputValue) => {
    try {
      const params = {
        userId: user.id,
        keyword: inputValue,
      };
      const res = await userApi.searchUser({ params });

      console.log(res.data);

      return res.data.map(x => {
        return {
          value: x.userId,
          label: x.userFullname,
          img: x.userImageUrl,
        }
      })
    } catch (err) {

    }
  }

  const loadOptions = async (inputValue, callback) => {
    callback(await filterColors(inputValue));
  };


  const onCreateGroupChat = async () => {
    console.log(options);
    console.log(grChatName);
    const members = options.map(option => {
      return option.value;
    })


    setGrChatName("");
    setOptions([]);
    //props.onCLoseModal();
  }

  const onChange = (e) => {
    setOptions(e);
  }
  const onInputGrChatName = (e) => {
    setGrChatName(e.target.value);
  }

  useEffect(() => {
    if (props.fixedMembers) {
      console.log(props.fixedMembers);
      setOptions(props.fixedMembers);
    }

  }, [props.fixedMembers]);

  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
  };
  
  return (
    <CModal show={props.showStartChat} onClose={handleOnClose} size="sm">
      <CModalHeader closeButton>Tạo nhóm chat mới</CModalHeader>
      <CModalBody className="new-card-form">
        <div style={{ width: "21rem" }}>
          <CInput type="text" placeholder="Tên nhóm chat" value={grChatName} onChange={onInputGrChatName} style={{ width: "21rem" }} />
          <br></br>
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
          <br></br>
          <div onClick={onCreateGroupChat} className="d-flex justify-content-end">
            <CButton className="btn-info">Tạo nhóm</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  );
}

export default StartChatMembers;
