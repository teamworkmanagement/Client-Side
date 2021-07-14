import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import axiosClient from "src/api/axiosClient";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
import "./GroupFilter.scss";

const CustomControl = ({ children, ...props }) => {
  return (
    <components.Control {...props}>
      <CIcon className="ml-2" name="cil-group" />
      {children}
    </components.Control>
  );
};

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div className="option-item">
        <img height={20} width={20} src={props.data.img} alt="" />
        <div>{props.data.label}</div>
      </div>
    </components.Option>
  );
};

function GroupFilter(props) {
  const [options, setOptions] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isFocused, setFocus] = React.useState(false);
  const user = useSelector((state) => state.auth.currentUser);
  const onInputChange = (e) => {};

  const onChange = (e) => {
    setCurrentGroup(e);
  };

  useEffect(() => {
    props.getGroupPost(currentGroup);
  }, currentGroup);

  useEffect(() => {
    if (props.clearSelect !== -1) setCurrentGroup(null);
  }, [props.clearSelect]);

  useEffect(() => {
    async function getGroups() {
      axiosClient
        .get(`/team/byuserid/${user.id}`)
        .then((res) => {
          const ops = res.data.map((x) => {
            return {
              value: x.teamId,
              label: x.teamName,
              img: x.teamImageUrl,
            };
          });
          setOptions(ops);
        })
        .catch((err) => {});
    }

    getGroups();
  }, []);

  return (
    <div className="groups-select">
      <Select
        value={isFocused ? null : currentGroup}
        onChange={onChange}
        options={options}
        placeholder="Chọn nhóm ..."
        components={{ Option: CustomOption, Control: CustomControl }}
        onInputChange={onInputChange}
        onFocus={() => {
          setFocus(true);
          setCurrentGroup(null);
        }}
        onBlur={() => setFocus(false)}
        blurInputOnSelect={true}
        styles={{
          // Fixes the overlapping problem of the component
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />
    </div>
  );
}

export default GroupFilter;
