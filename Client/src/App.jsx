import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css'
import { serverRequests } from './API'
// import Layout from './components/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'



export const UserContext = createContext();

function App() {

  const [userData, setUserData] = useState({});

  

  return (
 <UserContext.Provider value={userData}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login setUserData={setUserData} />} />
            <Route path="login" element={<Login setUserData={setUserData} />} />
            <Route path="signup" element={<SignUp setUserData={setUserData} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  )
}

export default App
