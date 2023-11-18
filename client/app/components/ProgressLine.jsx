'use client'
import React, { useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { ThemeContext } from './Providers'

const revenueDataOne = [60, 30, 60, 40, 55, 36]
const revenueDataTwo = [30, 60, 35, 66, 32, 45]
const ProgressLine = () => {
  const ctx = useContext(ThemeContext)
  return (
    <div className=' rounded-xl shadow-xl mt-5 p-3 dark:bg-black text-black dark:text-white'>
      <div className=' h-[15%]'>
        <div className='flex justify-end items-center gap-x-1'>
          <img
            src={ctx.theme === 'light' ? '/zoom-out.png' : '/zoom-out-gray.png'}
            alt='information'
            className=' h-[20px] w-[20px] object-contain cursor-pointer'
          />
          <img
            src='/zoom-in.png'
            alt='information'
            className=' h-[20px] w-[20px] object-contain cursor-pointer'
          />
          <img
            src='/palm-of-hand (1).png'
            alt='information'
            className=' h-[20px] w-[20px] object-contain cursor-pointer'
          />
          <img
            src='/home (1).png'
            alt='information'
            className=' h-[20px] w-[20px] object-contain cursor-pointer'
          />
          <img
            src={`/menu 1.png`}
            alt='information'
            className=' h-[20px] w-[20px] object-contain cursor-pointer'
          />
        </div>
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'weekly revenue1',
                data: revenueDataOne,
                fill: 'start',
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx
                  const gradient = ctx.createLinearGradient(0, 0, 0, 500)
                  gradient.addColorStop(0, '#6550eba8')
                  gradient.addColorStop(1, 'rgba(80, 115, 186, 0)')
                  return gradient
                },
                tension: 0.4,
                borderColor: '#6550eb'
              },
              {
                label: 'weekly revenue2',
                data: revenueDataTwo,
                fill: 'start',
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx
                  const gradient = ctx.createLinearGradient(0, 0, 0, 500)
                  gradient.addColorStop(0, '#08b165ff')
                  gradient.addColorStop(1, 'rgba(80, 115, 186, 0)')
                  return gradient
                },
                tension: 0.3,
                borderColor: '#08b165ff'
              }
            ]
          }}
          options={{
            scales: {
              x: {
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default ProgressLine
