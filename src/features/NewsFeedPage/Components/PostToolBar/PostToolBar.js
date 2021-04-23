import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PostToolBar.scss";
import { CRow, CCol, CCard } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CSelect,
} from "@coreui/react";
import UserFilter from "./UserFilter";

PostToolBar.propTypes = {};

function PostToolBar(props) {
  const [filter, setFilter] = useState(null);
  const [cFrom, setCFrom] = useState(false);
  const [cTo, setCto] = useState(false);
  const [cUser, setCuser] = useState(false);

  const [fDate, setFDate] = useState(null);
  const [tDate, setTDate] = useState(null);
  const [pUser, setPuser] = useState(null);

  const onChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    props.getFilter(filter);
  }, [filter])

  const onChangeDate = (e) => {
    const { value, name } = e.target;
    if (name === 'FromDate') {
      setFDate(value);
      if (cFrom)
        if (!value) {
          const { FromDate, ...noFromDate } = filter;
          setFilter(noFromDate);
        }
        else {
          setFilter({
            ...filter,
            FromDate: value,
          });
        }
    }
    else {
      setTDate(value);
      if (cTo) {
        if (!value) {
          const { ToDate, ...noToDate } = filter;
          setFilter(noToDate);
        }
        else {
          setFilter({
            ...filter,
            ToDate: value,
          });
        }
      }
    }
  }

  const onCheckBoxFromDate = (e) => {

    if (!cFrom && fDate) {
      setFilter({
        ...filter,
        FromDate: fDate,
      });
    }
    else if (cFrom) {
      setFilter({
        ...filter,
        FromDate: null,
      });
    }
    setCFrom(!cFrom);
  }

  const onCheckBoxToDate = (e) => {
    if (!cTo && tDate) {
      setFilter({
        ...filter,
        ToDate: tDate,
      });
    }
    else
      if (cTo) {
        setFilter({
          ...filter,
          ToDate: null,
        });
      }

    setCto(!cTo);
  }

  const onCheckBoxPostUser = (e) => {
    if (!cUser && pUser) {
      setFilter({
        ...filter,
        PostUser: pUser.value,
      });
    }
    else if (cUser) {
      setFilter({
        ...filter,
        PostUser: null,
      });
    }
    setCuser(!cUser);
  }

  const pickUser = (obj) => {
    if (cUser) {
      if (filter?.PostUser) {
        if (obj === null) {
          const { PostUser, ...noPostUser } = filter;
          setFilter(noPostUser);
        } else {
          setFilter({
            ...filter,
            PostUser: obj.value,
          })
        }
      }
      else if (!filter?.PostUser) {
        if (obj == null) {

        } else {
          setFilter({
            ...filter,
            PostUser: obj.value,
          })
        }
      }
    }
    setPuser(obj);
  }

  return (
    <CCard className="post-tool-bar">
      <div className="filter-title">
        Cơ bản
        <CButton shape="pill" color="danger">
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
            Mới nhất
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
            Giờ vừa qua
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
            Hôm nay
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
            Tuần này
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
            Tháng này
          </CLabel>
        </CFormGroup>
      </div>
      <div className="filter-title">
        Nâng cao
        <CButton shape="pill" color="danger">
          <CIcon name="cil-filter" />
        </CButton>
      </div>
      <div>
        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox id="checkbox1" checked={cFrom} onClick={onCheckBoxFromDate} name="checkbox1" />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox1"
          >
            Từ ngày
          </CLabel>
          <CInput
            type="date"
            id="date-from"
            name="FromDate"
            placeholder="date"
            value={fDate}
            onChange={onChangeDate}
          />
        </CFormGroup>
        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox id="checkbox2" checked={cTo} onClick={onCheckBoxToDate} name="checkbox2" />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox2"
          >
            Đến ngày
          </CLabel>
          <CInput
            type="date"
            id="date-to"
            name="ToDate"
            placeholder="date"
            value={tDate}
            onChange={onChangeDate}
          />
        </CFormGroup>

        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox id="checkbox4" checked={cUser} onClick={onCheckBoxPostUser} name="checkbox4" value="option4" />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox4"
          >
            Người đăng
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
