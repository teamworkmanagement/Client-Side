import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ImageGrid.scss";
import { CCol, CModal, CRow } from "@coreui/react";

ImageGrid.propTypes = {};

function ImageGrid(props) {
  const images = props.images;
  const imagesToShow = [...images];

  const hideOverlay = false;
  //const renderOverlay = () => "Preview Image";
  const overlayBackgroundColor = "#222222";
  const onClickEach = null;
  const countFrom = 5;
  const conditionalRender = false;
  const [modal, setModal] = useState(false);

  if (images.length > countFrom) {
    imagesToShow.length = countFrom;
  }

  function openModal(index) {
    const { onClickEach, images } = this.props;

    if (onClickEach) {
      return onClickEach({ src: images[index], index });
    }

    //this.setState({modal: true, url: images[index], index})
    setModal(true);
  }

  function onClose() {
    setModal(false);
  }

  function renderCountOverlay(more) {
    const { images } = props;
    const countFrom = 5;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

    return [
      more && <div key="count" className="cover"></div>,
      more && (
        <div
          key="count-sub"
          className="cover-text"
          style={{ fontSize: "200%" }}
        >
          <p>+{extra}</p>
        </div>
      ),
    ];
  }

  function renderOverlay(id) {
    if (hideOverlay) {
      return false;
    }

    return [
      <div
        key={`cover-${id}`}
        className="cover slide"
        style={{ backgroundColor: overlayBackgroundColor }}
      ></div>,
      <div
        key={`cover-text-${id}`}
        className="cover-text slide animate-text"
        style={{ fontSize: "100%" }}
      >
        {renderOverlay()}
      </div>,
    ];
  }

  function renderOne() {
    const { images } = props;
    const countFrom = 5;
    const overlay = renderOverlay();

    return (
      <CRow>
        <CCol
          xs={12}
          md={12}
          className={`border height-one background`}
          onClick={openModal(0)}
          style={{ background: `url(${images[0]})` }}
        >
          {overlay}
        </CCol>
      </CRow>
    );
  }

  return (
    <div className="images-grid-container">
      {[1, 3, 4].includes(imagesToShow.length) && renderOne()}
      {imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo()}
      {imagesToShow.length >= 4 && this.renderThree()}

      {/* {modal && <CModal onClose={onClose} index={index} images={images} />} */}
    </div>
  );
}

export default ImageGrid;
