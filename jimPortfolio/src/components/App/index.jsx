import { useState } from 'react'
import NameTag from '../NameTag'
import Nav from '../Nav'
import History from '../History'

function App() {
 

  return (
    <>
      <div className="bg-gradient-to-b from-black from-10% to-primary h-screen">
      <Nav />
      <NameTag />
      <History></History>
      </div>
    </>
  )
}

export default App
