import React from 'react';
import PropTypes from 'prop-types';
import './Empty.scss';

Empty.propTypes = {

};

function Empty(props) {
    return (
        <div className="wrapper-empty">
            <img src='https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'></img>
        </div>
    );
}

export default Empty;