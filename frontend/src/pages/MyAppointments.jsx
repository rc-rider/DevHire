import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDevelopersData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/users/appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        setAppointments(data.body.reverse())
        console.log(data.body)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/users/cancel-appointment', { appointmentId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDevelopersData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // New: Delete cancelled appointment
  const deleteCancelledAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/users/delete-appointment/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDevelopersData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  //Payment with Razorpay
  const initPay = (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        console.log(response)
        try {

          const { data } = await axios.post(backendUrl + '/api/users/verify-razorpay', response, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')

          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }



  const appointmentRazorpay = async (appointmentId) => {

    // API call

    try {

      const { data } = await axios.post(backendUrl + '/api/users/payment-razorpay', { appointmentId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        initPay(data.body)
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((items, index) => (
          <div
            key={index}
            className='relative grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
          >
            {/* Delete icon for cancelled slots */}
            {items.cancelled && (
              <button
                onClick={() => deleteCancelledAppointment(items._id)}
                title="Delete Cancelled Appointment"
                className="absolute right-2 top-2 text-red-600 hover:text-red-800 font-bold text-lg"
              >
                &#x2716;
              </button>
            )}
            {/* Delete icon for Completes slots */}
            {items.isCompleted && (
              <button
                onClick={() => deleteCancelledAppointment(items._id)}
                title="Delete Cancelled Appointment"
                className="absolute right-2 top-2 text-gray-600 hover:text-red-800 font-bold text-lg"
              >
                &#x2716;
              </button>
            )}

            <div>
              <img className='w-32 bg-indigo-50' src={items.devData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold '>{items.devData.name}</p>
              <p>{items.devData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1 '>Address:</p>
              <p className='text-xs'>{items.devData.address.line1}</p>
              <p className='text-xs'>{items.devData.address.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(items.slotDate)} | {items.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!items.cancelled && items.payment && !items.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-white bg-green-500'>Paid</button>}
              {!items.cancelled && !items.payment && !items.isCompleted && <button onClick={() => appointmentRazorpay(items._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!items.cancelled && !items.isCompleted &&
                <button onClick={() => cancelAppointment(items._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Developer Slot</button>
              }
              {items.cancelled && !items.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 cursor-default'>
                  Appointment Cancelled
                </button>
              )}
              {items.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments;
