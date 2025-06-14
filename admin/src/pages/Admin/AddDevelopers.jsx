import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axios from 'axios'



const AddDevelopers = () => {

    const [devImg, setDevImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [hourlyRate, setHourlyRate] = useState('')
    const [skills, setskills] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Frontend Developer')
    const [degree, setDegree] = useState('')
    const [Address1, setAddress1] = useState('')
    const [Address2, setAddress2] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false);


    const [showPassword, setShowPassword] = useState(false);


    const { backendUrl, aToken } = useContext(AdminContext)



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            if (!devImg) {
                return toast.error('Image not selected')
            }
            const formData = new FormData()

            formData.append('image', devImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('hourlyRate', Number(hourlyRate))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('skills', skills)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: Address1, line2: Address2 }))

            //console log formData using forEach method 
            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            })

            const { data } = await axios.post(
                `${backendUrl}/api/admin/add-developers`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );


            if (data.success) {
                toast.success(data.message)
                setDevImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setHourlyRate('')
                setskills('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }

    }

    if (isSubmitting) {
        return (
            <div className="fixed inset-0 bg-white/80 z-50 flex flex-col justify-center items-center">
                <svg className="animate-spin h-16 w-16 text-primary" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
                <p className="mt-4 text-lg font-medium text-primary animate-pulse">Adding Developer...</p>
            </div>
        );
    }



    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Developer</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="dev-img">
                        <img
                            className='w-16 bg-gray-100 rounded-full cursor-pointer'
                            src={devImg ? URL.createObjectURL(devImg) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input
                        type="file"
                        id="dev-img"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
                                if (file.size > maxSize) {
                                    toast.error('Image must be less than 10 MB');
                                    e.target.value = null;
                                    setDevImg(false);
                                    return;
                                }
                                setDevImg(file);
                            }
                        }}
                    />
                    <p>Upload Developer <br /> Picture (0 to 10 MB)</p>
                </div>


                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
                    <div className='w-full lg:flex-1 flex flex-col gap-4 '>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Developer Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2 ' type="text" placeholder='Name' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Developer Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 ' type="Email" placeholder='email' required />
                        </div>


                        <div className='flex-1 flex flex-col gap-1 relative'>
                            <p>Developer Password</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className='border rounded px-3 py-2 pr-10'
                                type={showPassword ? "text" : "password"}
                                placeholder='Password'
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-[38px] cursor-pointer text-gray-500'
                            >
                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                            </span>

                        </div>




                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2 ' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Hourly Rate</p>
                            <input onChange={(e) => setHourlyRate(e.target.value)} value={hourlyRate} className='border rounded px-3 py-2 ' type="number" placeholder='hourlyRate' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 ' name="" id="">
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
                                <option value="SEO Specialist">SEO Specialist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>skills</p>
                            <input onChange={(e) => setskills(e.target.value)} value={skills} className='border rounded px-3 py-2 ' type="text" placeholder='skills' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 ' type="text" placeholder='Education' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={Address1} className='border rounded px-3 py-2 ' type="text" placeholder='address 1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={Address2} className='border rounded px-3 py-2 ' type="text" placeholder='address 2' required />
                        </div>

                    </div>
                </div>
                <div >
                    <p className='mt-4 mb-2'>About Developer</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded ' placeholder='write about developer' rows={5} required />
                </div>

                <button
                    type='submit'
                    className={`bg-primary px-10 py-3 mt-4 text-white rounded-full transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Add Developer'}
                </button>

            </div>
        </form>
    )
}

export default AddDevelopers
