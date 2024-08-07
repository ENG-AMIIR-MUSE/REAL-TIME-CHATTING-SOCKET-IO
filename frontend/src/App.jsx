import { useState } from 'react'

import Login from './components/Login'
import Signup from './components/pages/signup/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/home/Home'

function App() {
  const [count, setCount] = useState(0)
  return (
 <div className='flex justify-center items-center h-screen '>

   {/* <Login/> */}
   {/* <Signup/> */}
   <Routes>
    <Route path='/register' element = {<Signup/>} />
    <Route path='/login' element = {<Login/>} />
   </Routes>
 </div>

  )
}

export default App
