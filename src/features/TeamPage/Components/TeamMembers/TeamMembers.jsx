import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './TeamMembers.scss';
import teamApi from "src/api/teamApi";
import { useParams } from "react-router";

TeamMembers.propTypes = {

};



function TeamMembers(props) {

    const [members, setMembers] = useState([]);
    const { teamId } = useParams();
    console.log(teamId);

    useEffect(() => {
        teamApi.getAllUserByTeam(teamId)
            .then(res => {
                setMembers(res.data);
            }).catch(err => {

            })
    }, [teamId])


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
