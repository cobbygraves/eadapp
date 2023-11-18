'use client'
import React, { useEffect } from 'react'
import ProgressLine from './ProgressLine'
import Statistics from './Statistics'

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <Statistics />
      <ProgressLine />
    </div>
  )
}

export default Dashboard
