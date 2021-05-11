import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import axiosClient from 'src/api/axiosClient';
import taskApi from 'src/api/taskApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditTask } from 'src/features/KanbanBoard/kanbanSlice';

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
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const [current, setCurrent] = useState(null);
    const [isFocused, setFocus] = useState(false);
    const user = useSelector(state => state.auth.currentUser);

    const onInputChange = (e) => {

    }

    useEffect(() => {
        //if (JSON.stringify(props.currentValue) === JSON.stringify({}))
            //return;

        console.log(props.currentValue);
        axiosClient.get(`/post/search-user?userId=${user.id}`)
            .then(res => {
                const ops = res.data.map(x => {
                    return {
                        value: x.userId,
                        label: x.userFullname,
                        img: x.userImageUrl,
                    }
                });

                setOptions(ops);


                const findObj = ops.find(x => x.value === props.currentValue.userId);
                if (findObj)
                    setCurrent(findObj);

            }).catch(err => {

            })
    }, [])

    const onChange = (e) => {
        setCurrent(e);
    }

    useEffect(() => {
        console.log(current);
        if (JSON.stringify(props.currentValue) === JSON.stringify({}))
            return;
        const task = props.currentValue;
        const taskMapObj = {
            kanbanListId: task.kanbanListId,
            taskId: task.taskId,
            image: task.taskImageUrl,
            taskName: task.taskName,
            taskStartDate: task.taskStartDate,
            taskDeadline: task.taskDeadline,
            taskDescription: task.taskDescription,
            taskStatus: task.taskStatus,
            commentsCount: task.commentsCount,
            filesCount: task.filesCount,
            userId: current ? current.value : null,
            userAvatar: current ? current.img : null,
            taskCompletedPercent: task.taskCompletedPercent,
            taskThemeColor: task.taskThemeColor,
            taskImageUrl: task.taskImageUrl,
        };

        console.log(taskMapObj);

        //props.onSelectedUser(current);

        console.log(props.currentValue);
        console.log(current);

        taskApi.reAssignTask({
            "currentUserId": current?.value,
            "taskId": props.currentValue.taskId,
        }).then(res => {
            dispatch(updateEditTask(taskMapObj));
            props.onSelectedUser(current);
        }).catch(err => { });


    }, [current])

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
                    onFocus={() => { setFocus(true); setCurrent(null) }}
                    onBlur={() => setFocus(false)}
                    blurInputOnSelect={true}
                />
            }
        </div>
    );
}

export default UserSelector;