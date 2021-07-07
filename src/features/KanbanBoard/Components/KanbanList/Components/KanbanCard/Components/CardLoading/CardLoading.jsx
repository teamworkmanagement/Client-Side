import React from 'react';
import './CardLoading.scss';





function CardLoading(props) {
    function getDisplay(){
        if(props.isLoading){
            return "block";
        }
        return "none"
    }
    return (
        <div style={{ display: getDisplay() }}
         className="lds-ellipsis2"><div></div><div></div><div></div><div></div></div>
    );
}

export default CardLoading;