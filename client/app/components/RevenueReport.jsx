import React from 'react'
import RevenueGraph from './RevenueGraph'
const RevenueReport = () => {
  return (
    <div className=' flex-1 rounded-xl shadow-xl py-2  dark:bg-black text-black dark:text-white min-h-[198px]'>
      <div className='flex justify-between px-5 '>
        <div className='mt-2'>
          <p>Revenue</p>
          <p className='text-green-500 text-[10px] mt-2'>36% ^</p>
        </div>
        <p className='font-bold ml-2 mb-2 text-2xl'>GH&#8373; 13,300</p>
      </div>
      <RevenueGraph />
    </div>
  )
}

export default RevenueReport
