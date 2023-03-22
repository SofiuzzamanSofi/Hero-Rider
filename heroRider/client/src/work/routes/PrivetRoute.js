import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../pages/Loading/LoadingSpinner';

function PrivetRoute({ children }) {



    const { user, loading } = useContext(AuthContext);
    let location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    } else if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
        return children;
    };
};

export default PrivetRoute;