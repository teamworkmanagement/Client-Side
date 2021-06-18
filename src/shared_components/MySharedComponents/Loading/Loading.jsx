import React from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

Loading.propTypes = {

};

function Loading(props) {
    return (
        <div className="loading-container">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                
             </div>
        
        </div>
        
    );
}

export default Loading;