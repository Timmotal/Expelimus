import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { WizardExpelimus } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
   <BrowserRouter>
    <header 
      className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-0 border-b border-b[#E6E6BF4]"
    >
      <Link to="/">
        <img src={WizardExpelimus} alt="logo" className='w-28 object-contain'/>
      </Link>

      <Link 
        to="/create-post"
        className='font-inter font-medium bg-[#e8994b] text-white px-4 py-2 rounded-md'
      >
        Create  
      </Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#F9FAFE] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
   </BrowserRouter>
  )
}

export default App
