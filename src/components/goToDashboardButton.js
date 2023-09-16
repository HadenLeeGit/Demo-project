import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { getUserData, pushData, getAllUsers } from "../Firebase";
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const GoToDashboardButton = () => {

    const { user, isAuthenticated } = useAuth0();
    

    var adminEmail = "software@thermasensecorp.com"

    const navigate = useNavigate()

    

    const viewUserDashboard = () => {
        navigate("/dashboard", { state: { data: getUserData } })
    }

    const viewAdminDashboard = () => {
        navigate("/admin", { state: { data: getUserData, listUsers: getAllUsers } })
    }


    return (
        <>
            {/* Admin Dashboard Button */}
            {isAuthenticated && user.email == adminEmail && (

                <div>
                    <Button onClick={() => viewAdminDashboard()} variant="dark" size="lg">
                    View Admin Dashboard
                    </Button>
                </div>
                
            )}

            {/* User Dashboard Button */}
            {isAuthenticated && user.email != adminEmail && (
                <Button onClick={() => viewUserDashboard()} variant="dark" size="lg">
                    View User Dashboard
                </Button>
            )}

        </>
    )
}

export default GoToDashboardButton