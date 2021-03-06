import React, { useEffect, useState } from "react";
import "./PostToolBar.scss";
import { CCard } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CLabel,
} from "@coreui/react";
import UserFilter from "../Post/Components/Selector/UserFilter/UserFilter";

function PostToolBar(props) {
  const [filter, setFilter] = useState(null);
  const [cFrom, setCFrom] = useState(false);
  const [cTo, setCto] = useState(false);
  const [cUser, setCuser] = useState(false);

  /*const [fDate, setFDate] = useState(null);
  const [tDate, setTDate] = useState(null);*/
  const [pUser, setPuser] = useState(null);

  const [basicFilter, setBasicFilter] = useState(null);
  const [adFilter, setAdFilter] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBasicFilter({
      ...basicFilter,
      [name]: value,
    });
  };

  useEffect(() => {
    props.getFilter(filter);
  }, [filter]);

  const onChangeDate = (e) => {
    const { value, name } = e.target;

    setAdFilter({
      ...adFilter,
      [name]: value !== "" ? Math.round(new Date(value).getTime()) : null,
    });
  };

  const onCheckBoxFromDate = (e) => {
    setCFrom(!cFrom);
  };

  const onCheckBoxToDate = (e) => {
    setCto(!cTo);
  };

  const onCheckBoxPostUser = (e) => {
    setCuser(!cUser);
  };

  const pickUser = (obj) => {
    setPuser(obj);
  };

  useEffect(() => {
    setAdFilter({
      ...adFilter,
      PostUser: pUser === null ? pUser : pUser.value,
    });
  }, [pUser]);

  const onFilterClick = (type) => {
    if (type === "basic") {
      console.log(basicFilter);
      setFilter({
        ...basicFilter,
      });
    } else {
      console.log(adFilter);
      const cloneAdFilter = { ...adFilter };

      if (!cFrom) cloneAdFilter.FromDate = null;

      if (!cTo) cloneAdFilter.ToDate = null;

      if (!cUser) cloneAdFilter.PostUser = null;

      if (!cFrom && !cTo && !cUser) {
        setFilter(null);
        return;
      }
      setFilter({
        ...cloneAdFilter,
      });
    }
  };
  return (
    <CCard className="post-tool-bar">
      <div className="filter-title">
        C?? b???n
        <CButton
          shape="pill"
          onClick={() => {
            onFilterClick("basic");
          }}
          color="danger"
        >
          <CIcon name="cil-filter" />
        </CButton>
      </div>
      <div>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio1"
            name="BasicFilter"
            value="lastest"
            onChange={onChange}
          />
          <CLabel variant="checkbox" htmlFor="radio1">
            M???i nh???t
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio2"
            name="BasicFilter"
            value="lasthour"
            onChange={onChange}
          />
          <CLabel variant="checkbox" htmlFor="radio2">
            Gi??? v???a qua
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio3"
            name="BasicFilter"
            value="today"
            onChange={onChange}
          />
          <CLabel variant="checkbox" htmlFor="radio3">
            H??m nay
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio4"
            name="BasicFilter"
            value="thisweek"
            onChange={onChange}
          />
          <CLabel variant="checkbox" htmlFor="radio4">
            Tu???n n??y
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio5"
            name="BasicFilter"
            value="thismonth"
            onChange={onChange}
          />
          <CLabel variant="checkbox" htmlFor="radio5">
            Th??ng n??y
          </CLabel>
        </CFormGroup>
      </div>
      <div className="filter-title">
        N??ng cao
        <CButton
          shape="pill"
          onClick={() => {
            onFilterClick("advanced");
          }}
          color="danger"
        >
          <CIcon name="cil-filter" />
        </CButton>
      </div>
      <div>
        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox
            id="checkbox1"
            checked={cFrom}
            onClick={onCheckBoxFromDate}
            name="checkbox1"
          />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox1"
          >
            T??? ng??y
          </CLabel>
          <CInput
            type="date"
            id="date-from"
            name="FromDate"
            placeholder="date"
            onChange={onChangeDate}
          />
        </CFormGroup>
        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox
            id="checkbox2"
            checked={cTo}
            onClick={onCheckBoxToDate}
            name="checkbox2"
          />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox2"
          >
            ?????n ng??y
          </CLabel>
          <CInput
            type="date"
            id="date-to"
            name="ToDate"
            placeholder="date"
            onChange={onChangeDate}
          />
        </CFormGroup>

        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox
            id="checkbox4"
            checked={cUser}
            onClick={onCheckBoxPostUser}
            name="checkbox4"
            value="option4"
          />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox4"
          >
            Ng?????i ????ng
          </CLabel>
          <CInputGroup>
            <UserFilter pickUser={pickUser} />
          </CInputGroup>
        </CFormGroup>
      </div>
    </CCard>
  );
}

export default PostToolBar;
