import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/auth/index';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const status = useSelector(state => state.auth.loginStatus);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            status ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;