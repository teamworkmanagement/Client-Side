import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import axiosClient from 'src/api/axiosClient';
import taskApi from 'src/api/taskApi';

UserSelector.propTypes = {

};



const ValueOption = (props) => (
    <components.SingleValue {...props}>
        <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto' }}>
            <img src={props.data.img} style={{ width: 30 }} alt="" />
            <span style={{ marginTop: 'auto', marginBottom: 'auto' }}>{props.data.label}</span>
        </div>
    </components.SingleValue>
);


export const CustomOption = (props) => {
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', justifyContent: 'space-between' }}>
                <img height={20} width={20} src={props.data.img} />
                <label>{props.data.label}</label>
            </div>
        </components.Option>
    );
};




function UserSelector(props) {
    const [options, setOptions] = useState([]);
    const [current, setCurrent] = useState(null);
    const [isFocused, setFocus] = useState(false);
    const [prevUser, setPrevUser] = useState(null);

    const onInputChange = (e) => {
        if (e) {
            axiosClient.get(`/post/search-user?userId=8650b7fe-2952-4b03-983c-660dddda9029&keyWord=${e}`)
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
    }

    const onChange = (e) => {
        setCurrent(e);
        console.log(e);

        if (e.value !== prevUser) {
            props.onSelectedUser(e);

            if (!prevUser) {
                taskApi.addHandleTask({
                    "handleTaskUserId": e.value,
                    "handleTaskTaskId": props.currentValue.taskId,
                }).then(res => { }).catch(err => { });
            }
            else {
                taskApi.reAssignTask({
                    "prevUserId": prevUser,
                    "currentUserId": e.value,
                    "taskId": props.currentValue.taskId,
                }).then(res => { }).catch(err => { });
            }
        }

    }

    useEffect(() => {
        const value = {
            value: props.currentValue.userId,
            label: props.currentValue.userName,
            img: props.currentValue.userAvatar,
        }

        setCurrent(value);
        setPrevUser(props.currentValue.userId);
    }, [props.currentValue])
    return (
        <div style={{ width: '175%' }}>
            {
                <Select
                    value={isFocused ? null : current}
                    onChange={onChange}
                    options={options}
                    placeholder='Nhập thành viên'
                    components={{ Option: CustomOption, SingleValue: ValueOption }}
                    onInputChange={onInputChange}
                />
            }
        </div>
    );
}

export default UserSelector;