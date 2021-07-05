import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userApi from 'src/api/userApi';
import UserInfoModal from 'src/shared_components/MySharedComponents/UserInfoModal/UserInfoModal';
import './Tag.scss';
import { useDispatch } from 'react-redux';
import { setUserModal } from 'src/appSlice';

Tag.propTypes = {

};

function Tag(props) {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (props.userId) {
            userApi.getById(props.userId)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {

                })
        }
    }, [props.userId])

    const dispatch = useDispatch();
    const showInfoClick = () => {
        
       // if(props.postId){
            dispatch(setUserModal({
                show: true,
                userId: user.userId
            }));
        //}
        //else{
          //  setShowModal(true);
        //}
        
    }

    const onCloseModal = () => {
        setShowModal(false);
    }
    return (
        <div className="my-tag">
            <strong onClick={showInfoClick}>{user?.userFullname}</strong>
            <UserInfoModal userInfo={user} show={showModal} onClose={onCloseModal} />
        </div>
    );
}

export default Tag;