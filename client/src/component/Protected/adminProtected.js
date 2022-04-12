import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import HeaderAdmin from '../Admin/HeaderAdmin';

function AdminProtected () {

    const {user } = useSelector(state => state.userAuth);
    return (
       user && user.isAdmin ? <div><HeaderAdmin/><Outlet/></div> : <Navigate to='../login' />
    );
}

export default AdminProtected;
