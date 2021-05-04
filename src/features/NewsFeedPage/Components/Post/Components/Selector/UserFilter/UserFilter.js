import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import axiosClient from 'src/api/axiosClient';
import CIcon from '@coreui/icons-react';
import { useSelector } from 'react-redux';

UserFilter.propTypes = {

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


function UserFilter(props) {
    const [options, setOptions] = useState([]);
    const [current, setCurrent] = useState(null);
    const [isFocused, setFocus] = React.useState(false);
    const user = useSelector(state => state.auth.currentUser);

    const onInputChange = (e) => {
        if (e) {
            axiosClient.get(`/post/search-user?userId=${user.id}&keyWord=${e}`)
                .then(res => {
                    const ops = res.data.map(x => {
                        return {
                            value: x.userId,
                            label: x.userFullname,
                            img: 'https://cdn.gametv.vn/gtv-photo/GTVNews/1616637522/api_cdn.gametv.vn-9bd2020a72acd9c7e91a4438108758ef.jpg',
                        }
                    })
                    setOptions(ops);
                }).catch(err => {

                })
        }
        else
            setOptions([]);
    }

    const onChange = (e) => {
        setCurrent(e);
    }

    useEffect(() => {
        props.pickUser(current);
    }, current);

    return (
        <div style={{ width: '100%' }}>
            <Select
                value={isFocused ? null : current}
                onChange={onChange}
                options={options}
                placeholder='Tìm người đăng'
                components={{ Option: CustomOption, Control: CustomControl }}
                onInputChange={onInputChange}
                onFocus={() => { setFocus(true); setCurrent(null) }}
                onBlur={() => setFocus(false)}
                blurInputOnSelect={true} />
        </div>
    );
}

export default UserFilter;