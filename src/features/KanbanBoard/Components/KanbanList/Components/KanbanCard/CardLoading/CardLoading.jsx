import React from 'react';
import PropTypes from 'prop-types';
import './CardLoading.scss';

CardLoading.propTypes = {
    
};

function CardLoading(props) {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

export default CardLoading;