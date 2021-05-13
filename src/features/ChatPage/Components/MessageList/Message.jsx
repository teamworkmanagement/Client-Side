import React from 'react';
import PropTypes from 'prop-types';
import './MessageList.scss';
import { CTooltip } from "@coreui/react";
import moment from "moment";

Message.propTypes = {

};

function Message({ item, index }) {
    const renderMes = () => {
        switch (item.messageType) {
            case 'file':
                return <strong>{item.message.split('/').pop()}</strong>;
            case 'image':
                return <img style={{ width: '30%', height: '30%' }} src={item.message}></img>
            default:
                return <div className="message-text">{item.message}</div>;
        }
    }
    return (
        <div className="message">
            {
                item.isLabel ? (
                    <div className="message-label">{item.message}</div>
                ) : (
                    <div
                        key={item.messageId}
                        animationDelay={index + 2}
                        className={`message-item-container ${item.class ? item.class : ""
                            } ${item.isMine ? "mine" : ""} `}
                    >
                        <img
                            className="avatar"
                            alt=""
                            src="http://emilus.themenate.net/img/avatars/thumb-2.jpg"
                        />

                        <div className="message-content">
                            <CTooltip
                                className="my-tooltip"
                                content={moment(item.time).format("DD/MM/YYYY hh:mma")}
                                placement={item.isMine ? "left" : "right"}
                            >
                                {renderMes()}
                            </CTooltip>
                            <div className="message-time">
                                {moment(item.time).format("DD/MM/YYYY hh:mma")}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Message = React.memo(Message);