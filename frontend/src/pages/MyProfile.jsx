import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from '../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {

    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);
    const [isUploading, setIsUploading] = useState(false); // 👈 Uploading state

    const updateUserProfileData = async () => {
        try {
            setIsUploading(true); // Start loader
            const formData = new FormData();

            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            image && formData.append('image', image);

            const { data } = await axios.post(backendUrl + '/api/users/update-profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsUploading(false); // Stop loader
        }
    };

    return userData && (
        <div className="max-w-lg flex flex-col gap-2 text-sm">

            {/* Profile Image */}
            {
                isEdit ? (
                    <label htmlFor="image">
                        <div className="inline-block relative cursor-pointer">
                            <img className={`w-36 rounded ${isUploading ? 'opacity-50 blur-[1px]' : ''}`} src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                            {!image && (
                                <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="" />
                            )}
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                ) : (
                    <img className="w-40 h-52 bg-more rounded object-contain" src={userData.image} alt="" />
                )
            }

            {/* Name */}
            {
                isEdit
                    ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 " type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                    : <p className="font-medium text-3xl text-neutral-800 mt-4 ">{userData.name}</p>
            }

            <hr className="bg-zinc-400  h-[1px] border-none " />
            <div>
                <p className="text-neutral-500 underline mt-3 ">CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email id:</p>
                    <p className="text-primary">{userData.email}</p>
                    <p className="font-medium">Phone:</p>
                    {
                        isEdit
                            ? <input className="bg-gray-100 max-w-52" type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                            : <p className="text-primary">{userData.phone}</p>
                    }

                    <p className="font-medium">Address:</p>
                    {
                        isEdit
                            ? <p>
                                <input className="bg-gray-50" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                                <br />
                                <input className="bg-gray-50" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                            </p>
                            : <p className="text-gray-500">
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>
            <div>
                <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium ">Gender:</p>
                    {
                        isEdit
                            ? <select className="max-w-20 bg-gray-100" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className="text-gray-400">{userData.gender}</p>
                    }
                    <p className="font-medium">Birthday:</p>
                    {
                        isEdit
                            ? <input className="max-w-28 bg-gray-100 " type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            : <p className="text-gray-400">{userData.dob}</p>
                    }
                </div>
            </div>

            {/* Save/Edit Button */}
            <div className="mt-10">
                {
                    isEdit ? (
                        <button
                            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                            onClick={updateUserProfileData}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    <span>Uploading...</span>
                                </>
                            ) : "Save Information"}
                        </button>
                    ) : (
                        <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
                    )
                }
            </div>
        </div>
    );
};

export default MyProfile;
