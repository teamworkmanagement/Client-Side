import React from 'react';
import './TeamLoading.scss';





function TeamLoading(props) {
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

export default TeamLoading;