import React from 'react';
import './Loading.scss';



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