import React from 'react'
import AddPostForm  from './components/AddPostForm'
// import DeletePost from './components/DeletePost'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
// import UpdatePost from './components/UpdatePost';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addpost" element={ <AddPostForm />} />
        {/* <Route path="/deletepost" element={<DeletePost />} /> */}
    </Routes>
  </BrowserRouter>
      
  )
}

export default App
