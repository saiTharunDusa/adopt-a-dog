import React from 'react'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Search from './components/Search'

const App : React.FC = () => {
  return(
    <div className='min-h-screen bg-white'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dogs/search' element={<Search/>}/>
      </Routes>
    </div>
  )
}

export default App