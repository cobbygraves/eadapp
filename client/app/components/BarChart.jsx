'use client'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const barChartData = {
  labels: [
    '1d',
    '2d',
    '3d',
    '4d',
    '5d',
    '6d',
    '7d',
    '8d',
    '9d',
    '10d',
    '11d',
    '12d',
    '13d',
    '14d',
    '15d',
    '16d',
    '17d',
    '18d',
    '19d',
    '20d',
    '21d'
  ],
  datasets: [
    {
      label: 'First dataset',
      data: [
        7, 9, 10, 11, 14, 15, 16, 11, 14, 12, 15, 19, 10, 10, 17, 13, 18, 14,
        14, 15, 12
      ],
      fill: 'start',
      backgroundColor: '#6550eb',
      borderRadius: 10,
      barPercentage: 0.9,
      fontSize: 7,
      categoryPercentage: 0.9,
      borderRadius: {
        bottomLeft: 10,
        bottomRight: 10,
        topLeft: 10,
        topRight: 10
      },
      borderSkipped: false
    }
  ]
}

function BarChart() {
  return (
    <>
      <Bar
        data={barChartData}
        options={{
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              display: false,
              grid: {
                display: false
              }
            }
          }
        }}
        plugins={[
          {
            id: 'barBackground',
            beforeDatasetDraw: (chart, args, options) => {
              const {
                ctx,
                data,
                chartArea,
                scales: { x, y }
              } = chart
              const { top, bottom, left, right, height, width } = chartArea
              ctx.save()
              // ctx.fillStyle = options.color

              // ctx.restore()
              const segment = width / barChartData.labels.length
              const barWidth =
                segment *
                data.datasets[0].barPercentage *
                data.datasets[0].categoryPercentage
              ctx.fillStyle = '#ccc'
              for (let i = 0; i < barChartData.labels.length; i++) {
                // ctx.fillRect(
                //   x.getPixelForValue(i) - barWidth / 2,
                //   top,
                //   barWidth,
                //   height - 10
                // )
                ctx.beginPath()
                ctx.roundRect(
                  x.getPixelForValue(i) - barWidth / 2,
                  top,
                  barWidth,
                  height - 10,
                  [20]
                )
                ctx.fillStyle = '#ccc'
                ctx.fill()
              }
            }
          }
        ]}
      />
    </>
  )
}

export default BarChart
