import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DevelopersList = () => {
  const {developers  , aToken , getAllDevelopers, changeAvailablity } = useContext(AdminContext)

  useEffect(()=>{
    if (aToken) {
      getAllDevelopers()
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>


      <h1 className='text-lg font-medium'>All Developers</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6 '>
        {
          developers.map((items ,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 object-contain w-64 h-60' src={items.image} alt="" />
              <div className='p-4 '>
                <p className='text-neutral-800 text-lg font-medium'>{items.name}</p>
                <p className='text-zinc-600 text-sm'>{items.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailablity(items._id)} type="checkbox" checked={items.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>



    </div>
  )
}

export default DevelopersList
