import { useState } from 'react'
import NameTag from '../NameTag'
import Nav from '../Nav'
import History from '../History'
import { Routes, Route } from 'react-router-dom'
import AboutPage from '../AboutPage'
import ProjectsPage from '../ProjectsPage'
import ContactPage from '../ContactPage'



function App() {
 

  return (
    <>
      <div className="bg-fixed bg-gradient-to-b  from-black from-40% to-primary h-screen">
      <Nav />
      <NameTag />
      <Routes> 
        <Route path="/" element={<History />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </div>
    </>
  )
}

export default App
