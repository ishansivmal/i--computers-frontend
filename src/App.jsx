import { useState } from 'react'

import './App.css'
import ProductCard from './components/product-card'
import Header from './components/header'
import Test from './components/test'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/homePage'
import { LoginPage } from './Pages/loginPage'
import { RegisterPage } from './Pages/registerPage'
import { AdminPage } from './Pages/adminPage'
import { TestPage } from './Pages/testPage'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'



function App() {

  return (
    <GoogleOAuthProvider clientId='794734347965-0aqv735qeihonn3ub64h0k9k1u62v15e.apps.googleusercontent.com'>  
    <BrowserRouter>
    <Toaster  position='top-right'/>
     <div className='w-full h-screen bg-primary text-secondary'>

        <Routes>
             <Route path="/*" element={<HomePage />} />
             <Route path="/login" element={<LoginPage />} />
             <Route path="/register" element={<RegisterPage />} />
             <Route path="/admin/*" element={<AdminPage />} />
             <Route path="/test" element={<TestPage />} />

        </Routes>
        
     </div> 

   </BrowserRouter>
    </GoogleOAuthProvider>
   
  );
}

export default App
