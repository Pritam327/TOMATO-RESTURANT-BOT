import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Placerder from './pages/PlaceOrder/PlacerOder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import ChatBot from './components/ChatBot/ChatBot';

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (

    <>
    
      <div className='app'>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      

      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = '/cart' element={<Cart/>} />
        <Route path = '/order' element={<Placerder/>} />
        <Route path = '/verify' element={<Verify/>} />
        <Route path = '/myorders' element={<MyOrders/>} />

      </Routes>
       
    </div>
    <Footer/>
    <ChatBot />
    </>
    
  )
}

export default App
