import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [developers, setDevelopers] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // 🔐 Verify token with backend
    const verifyToken = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/verify-token`, {}, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (!data.success) {
                toast.error("Session expired. Please login again.");
                logout();
            }
        } catch (err) {
            toast.error("Authentication failed.");
            logout();
        }
    };

    useEffect(() => {
        if (aToken) {
            verifyToken();
        }
    }, [aToken]);

    const getAllDevelopers = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-developers`, {}, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (data.success) {
                setDevelopers(data.developers);
                console.log(data.developers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailablity = async (devId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availablity`, { devId }, {
                headers: { Authorization: `Bearer ${aToken}` }
            });

            if (data.success) {
                toast.success(data.message);
                getAllDevelopers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('aToken');
        setAToken('');
    };

    const getAllAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-appointments', { headers: { Authorization: `Bearer ${aToken}` } })
            if (data.success) {
                setAppointments(data.body)
                console.log(data.body)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${aToken}` } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
                getDashData();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }

    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { Authorization: `Bearer ${aToken}` } })

            if (data.success) {
                setDashData(data.body)
                console.log(data.body)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        developers,
        getAllDevelopers,
        changeAvailablity,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData,
        logout,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};


export default AdminContextProvider;
