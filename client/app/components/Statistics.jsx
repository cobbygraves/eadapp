import React from 'react'
import WeeklyReport from './WeeklyReport'
import RevenueReport from './RevenueReport'
import TotalReport from './TotalReport'

const data = [33, 53, 40, 51, 44]

const Statistics = () => {
  return (
    <div className='flex gap-2'>
      <WeeklyReport weeklyData={data} />
      <RevenueReport />
      <TotalReport />
    </div>
  )
}

export default Statistics
