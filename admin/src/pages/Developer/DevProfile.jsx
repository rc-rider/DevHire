import React, { useContext, useEffect, useState } from 'react'
import { DevContext } from '../../context/DevContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const DevProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl, } = useContext(DevContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [isUploading, setIsUploading] = useState(false)


  const updateProfile = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();

      // Append all fields
      formData.append('devId', profileData._id);
      formData.append('name', profileData.name);
      formData.append('address[line1]', profileData.address.line1);
      formData.append('address[line2]', profileData.address.line2);
      formData.append('degree', profileData.degree);
      formData.append('speciality', profileData.speciality);
      formData.append('skills', profileData.skills);
      formData.append('hourlyRate', profileData.hourlyRate);
      formData.append('about', profileData.about);
      formData.append('available', profileData.available);
      formData.append('experience', profileData.experience);

      // Append image file if it exists (from file input)
      if (profileData.imageFile) {
        formData.append('imageFile', profileData.imageFile);
      }

      const { data } = await axios.post(
        backendUrl + '/api/developers/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
            'Content-Type': 'multipart/form-data', // important!
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };


  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  useEffect(() => {
    return () => {
      if (profileData.imageFile) {
        URL.revokeObjectURL(profileData.image);
      }
    };
  }, [profileData.imageFile]);


  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5 '>

        <div>
          {isEdit ? (
            <label htmlFor="dev-image">
              <div className="relative inline-block cursor-pointer">
                <img
                  className="bg-primary/70 w-full sm:max-w-64 rounded-lg"
                  src={
                    profileData.imageFile
                      ? URL.createObjectURL(profileData.imageFile)
                      : profileData.image
                  }
                  alt="Developer Profile"
                />
                {/* Upload icon overlay (visible only in edit mode) */}
                <svg
                  className="w-8 h-8 text-primary absolute bottom-3 right-3 bg-white rounded-full p-1 shadow-md"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0-9l-3 3m3-3l3 3m0-6v-6m0 0L9 9m3-3l3 3"
                  />
                </svg>
              </div>
              <input
                type="file"
                id="dev-image"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfileData((prev) => ({
                      ...prev,
                      imageFile: file,
                      image: URL.createObjectURL(file),
                    }));
                  }
                }}
              />
            </label>
          ) : (
            <img
              className="bg-primary/70 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt="Developer Profile"
            />
          )}
        </div>


        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* -------------Dev Info : name , degree, experience ---------- */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} value={profileData.name} /> : profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, degree: e.target.value }))
                    }
                    value={profileData.degree}
                    className="border rounded px-3 py-2 mr-2"
                  />
                  <select
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, speciality: e.target.value }))
                    }
                    value={profileData.speciality}
                    className="border rounded px-3 py-2"
                  >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Cybersecurity Expert">Cybersecurity Expert</option>
                    <option value="Mobile App Developer">Mobile App Developer</option>
                    <option value="SEO Specialist">SEO Specialist</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="QA / Tester">QA / Tester</option>
                    <option value="Cloud Architect">Cloud Architect</option>
                    <option value="QA Automation Engineer">QA Automation Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Game Developer">Game Developer</option>
                    <option value="Blockchain Developer">Blockchain Developer</option>
                    <option value="Python Developer">Python Developer</option>
                    <option value="Technical Writer & API Doc Expert">Technical Writer & API Doc Expert</option>
                  </select>
                </>
              ) : (
                <>
                  {profileData.degree} - {profileData.speciality}
                </>
              )}
            </p>

            <button className='py-0.5 px-2 border text-sm rounded-full'>{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))} value={profileData.experience} /> : profileData.experience}</button>
          </div>


          {/* ----Dev About----- */}
          <div>
            <p className='flex items-center gap-2 mt-1 text-gray-600'>Skills - {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, skills: e.target.value }))} value={profileData.skills} /> : profileData.skills}</p>
            <div className="text-sm text-gray-600 w-full max-w-[750px] mt-1">
              <label className="font-semibold text-base mb-2 block mt-3">About:</label>

              {isEdit ? (
                <textarea
                  className="w-full min-w-full max-w-full border border-gray-300 bg-white text-gray-800 rounded-lg p-4 text-[15px] leading-relaxed shadow-md resize-none transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={6}
                  cols={100}
                  placeholder="Write something about yourself..."
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, about: e.target.value }))
                  }
                  value={profileData.about}
                />
              ) : (
                <p className="text-[15px] leading-relaxed whitespace-pre-line">{profileData.about}</p>
              )}
            </div>

          </div>

          <p className='text-gray-600 font-medium mt-4 '>Appointment Fee: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: e.target.value }))} value={profileData.hourlyRate} /> : profileData.hourlyRate}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm '>
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}

            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
              disabled={!isEdit}
            />


            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ? <button onClick={updateProfile} disabled={isUploading} className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2">
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

              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all '>Edit</button>
          }

        </div>
      </div>
    </div >
  )
}

export default DevProfile
