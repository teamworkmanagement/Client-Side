import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import axiosClient from 'src/api/axiosClient';
import CIcon from '@coreui/icons-react';

GroupFilter.propTypes = {

};




const CustomControl = ({ children, ...props }) => {
    return (
        <components.Control {...props}>
            <CIcon className="ml-1" name="cil-user" />
            {children}
        </components.Control>
    );
};

const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img height={20} width={20} src={props.data.img} />
                <label>{props.data.label}</label>
            </div>
        </components.Option>
    );
};


function GroupFilter(props) {
    const [options, setOptions] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [isFocused, setFocus] = React.useState(false);

    const onInputChange = (e) => {

    }

    const onChange = (e) => {
        setCurrentGroup(e);
    }

    useEffect(() => {
        props.getGroupPost(currentGroup);
    }, currentGroup);

    useEffect(() => {
        if (props.clearSelect !== -1)
            setCurrentGroup(null);
    }, [props.clearSelect])

    useEffect(() => {
        async function getGroups() {
            axiosClient.get(`/team/byuserid/8650b7fe-2952-4b03-983c-660dddda9029`)
                .then(res => {
                    const ops = res.data.map(x => {
                        return {
                            value: x.teamId,
                            label: x.teamName,
                            img: x.teamAvatar ? x.teamAvatar : 'https://cdn.gametv.vn/gtv-photo/GTVNews/1616637522/api_cdn.gametv.vn-9bd2020a72acd9c7e91a4438108758ef.jpg',
                        }
                    })
                    setOptions(ops);
                }).catch(err => {

                })
        }

        getGroups();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <Select
                value={isFocused ? null : currentGroup}
                onChange={onChange}
                options={options}
                placeholder='Chọn nhóm ...'
                components={{ Option: CustomOption, Control: CustomControl }}
                onInputChange={onInputChange}
                onFocus={() => { setFocus(true); setCurrentGroup(null) }}
                onBlur={() => setFocus(false)}
                blurInputOnSelect={true} />
        </div>
    );
}

export default GroupFilter;