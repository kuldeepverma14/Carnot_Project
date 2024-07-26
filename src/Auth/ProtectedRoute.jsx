/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    // If there is no token, redirect to the SignIn page
    if (!token) {
        return <Navigate to="/signin" />;
    }

    // If there is a token, render the children (protected content)
    return children;
};

export default ProtectedRoute;
