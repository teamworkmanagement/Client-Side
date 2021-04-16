import React from "react";
import PropTypes from "prop-types";
import "./PostToolBar.scss";
import { CRow, CCol, CCard, CCardHeader, CCardBody } from "@coreui/react";
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

PostToolBar.propTypes = {};

function PostToolBar(props) {
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
            name="radios"
            value="option1"
          />
          <CLabel variant="checkbox" htmlFor="radio1">
            Mới nhất
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio2"
            name="radios"
            value="option2"
          />
          <CLabel variant="checkbox" htmlFor="radio2">
            Giờ vừa qua
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio3"
            name="radios"
            value="option3"
          />
          <CLabel variant="checkbox" htmlFor="radio3">
            Hôm nay
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio4"
            name="radios"
            value="option4"
          />
          <CLabel variant="checkbox" htmlFor="radio4">
            Tuần này
          </CLabel>
        </CFormGroup>
        <CFormGroup variant="checkbox">
          <CInputRadio
            className="form-check-input"
            id="radio5"
            name="radios"
            value="option5"
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
          <CInputCheckbox id="checkbox1" name="checkbox1" value="option1" />
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
            name="date-input"
            placeholder="date"
          />
        </CFormGroup>
        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
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
            name="date-input"
            placeholder="date"
          />
        </CFormGroup>

        <CFormGroup variant="checkbox" className="checkbox">
          <CInputCheckbox id="checkbox4" name="checkbox4" value="option4" />
          <CLabel
            variant="checkbox"
            className="form-check-label"
            htmlFor="checkbox4"
          >
            Người đăng
          </CLabel>
          <CInputGroup>
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput id="input1-group1" name="input1-group1" placeholder="" />
          </CInputGroup>
        </CFormGroup>
      </div>
    </CCard>
  );
}

export default PostToolBar;
