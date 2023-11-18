import React from 'react'
import BarChart from './BarChart'

const TotalReport = () => {
  return (
    <div className='flex-1 rounded-xl shadow-xl p-3  dark:bg-black text-black dark:text-white min-h-[198px]'>
      <div className='flex justify-between items-center'>
        <p className='text-gray-400 text-sm font-semibold ml-2'>
          Total earning
        </p>
        <img
          src='/information.png'
          alt='information'
          className=' h-[20px] w-[20px] object-contain cursor-pointer'
        />
      </div>
      <p className='text-green-500 text-[13px] mt-5 text-center'>36% ^</p>
      <p className='text-gray-400 text-sm ml-2 mb-2'>April</p>
      <BarChart />
    </div>
  )
}

export default TotalReport
