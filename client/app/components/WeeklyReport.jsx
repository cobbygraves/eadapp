'use client'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function WeeklyReport({ weeklyData }) {
  return (
    <div>
      <div className='flex flex-2 justify-between bg-white shadow-lg rounded-lg dark:bg-black text-black dark:text-white min-h-[120px]'>
        <div>
          <p className='text-gray-400 text-sm font-semibold ml-2 my-5'>
            This week{' '}
            <span className='text-green-500 text-[10px] relative bottom-[2px]'>
              36% ^
            </span>
          </p>
          <p className='font-bold ml-2 my-5 text-[20px]'>GH&#8373; 2,072</p>
        </div>

        <div className=' h-[65px] mt-5 ml-5'>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'First dataset',
                  data: weeklyData,
                  fill: 'start',
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
                    gradient.addColorStop(0, '#6550eba8')
                    gradient.addColorStop(0.25, 'rgba(80, 115, 186, 0)')
                    return gradient
                  },
                  tension: 0.4,
                  borderColor: '#6550eb',
                  pointStyle: false
                }
              ]
            }}
            options={{
              scales: {
                x: {
                  display: false
                },
                y: {
                  display: false
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
      <div className='bg-white rounded-lg py-3 shadow-2xl dark:bg-black text-black dark:text-white mt-14 min-h-[125px]'>
        <p className='text-gray-400 text-sm font-semibold ml-2 my-2'>Income</p>
        <div className='flex justify-between items-center mt-8'>
          <p className='font-bold ml-2 mb-2 text-2xl'>GH&#8373; 13,300</p>
          <p className='text-green-500 pr-3'>+14%</p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyReport
