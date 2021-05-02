import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './TeamMembers.scss';
import teamApi from "src/api/teamApi";

TeamMembers.propTypes = {

};



function TeamMembers(props) {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        teamApi.getAllUserByTeam('a78a2d84-05a7-40a8-a278-814a10df9cbf')
            .then(res => {
                setMembers(res.data);
            }).catch(err => {

            })
    }, [])

    return (
        <div className="list-file-table-container">
            <div className="upload-container">
                <img className="upload-image" src={"images/upload.png"} alt="" />
                <div>Thêm thành viên</div>
            </div>
            {
                members.map(m =>

                    <div key={m.userId}>{m.userFullname}</div>

                )
            }
        </div>
    );
}

export default TeamMembers;
