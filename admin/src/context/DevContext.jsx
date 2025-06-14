import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify'

export const DevContext = createContext()

const DevContextProvider = (props) => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/developers/appointments', { headers: { Authorization: `Bearer ${dToken}` } })

            if (data.success) {
                setAppointments(data.body)
                console.log(data.body)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/developers/complete-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }


    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/developers/cancelled-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/developers/dashboard', { headers: { Authorization: `Bearer ${dToken}` } })

            if (data.success) {
                setDashData(data.body)
                console.log(data.body)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }


    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/developers/profile', { headers: { Authorization: `Bearer ${dToken}` } })

            if (data.success) {
                setProfileData(data.body)
                console.log(data.body)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
    }

    return (
        <DevContext.Provider value={value}>
            {props.children}
        </DevContext.Provider>
    )

}

export default DevContextProvider