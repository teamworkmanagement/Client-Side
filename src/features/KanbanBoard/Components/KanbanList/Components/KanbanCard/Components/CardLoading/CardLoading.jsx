import React from 'react';
import PropTypes from 'prop-types';
import './CardLoading.scss';

CardLoading.propTypes = {
    
};



function CardLoading(props) {
    function getDisplay(){
        if(props.isLoading){
            return "block";
        }
        return "none"
    }
    return (
        <div style={{ display: getDisplay() }}
         className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

export default CardLoading;