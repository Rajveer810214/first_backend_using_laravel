import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import FetchPosts from './FetchPosts.jsx'
const Dashboard = () => {
  return (
    <div>
        <Navbar />
     <FetchPosts />
    </div>
  )
}

export default Dashboard
