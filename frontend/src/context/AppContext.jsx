import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "$";
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const getDevelopersData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/developers/list`);
            if (data.success) {
                setDevelopers(data.body);  // Note: use `data.body`, not `data.developers`
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/users/get-profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setUserData(data.body);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };
    
    const value = {
        developers,
        getDevelopersData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        loading,
    };

    useEffect(() => {
        getDevelopersData();
    }, []);


    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
