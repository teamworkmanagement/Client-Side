import React from 'react';
import PropTypes from 'prop-types';
import './UploadItem.scss';

UploadItem.propTypes = {

};

function UploadItem({ name, progress }) {
    return (
        <div className="wrapper">
            <div className="wrapperItem">
                <div className="leftSide">
                    <div className="progressBar">
                        <div style={{ width: `${progress}%` }} />
                    </div>
                    <label>{name}</label>
                </div>
                <span className="percentage">{progress}%</span>
            </div>
        </div>
    );
}

export default UploadItem;