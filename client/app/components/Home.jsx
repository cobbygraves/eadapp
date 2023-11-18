import React from 'react'
import Dashboard from './Dashboard'
import Farmers from './Farmers'

const Home = ({ sectionNumber }) => {
  switch (sectionNumber) {
    case 0:
      return <Dashboard />
    case 1:
      return <Farmers />
    default:
      return <Dashboard />
  }
}

export default Home
