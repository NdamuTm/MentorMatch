// App.js

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import Account from './pages/Account';
import Add from './pages/Add';
import Call from './pages/Call';
import Chat from './pages/Chat';
import Connections from './pages/Connections';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Saved from './pages/Saved';
import Search from './pages/Search';
import Setup from './pages/Setup';
import Signup from './pages/Signup';
import Splash from './pages/Splash';
import UserDetail from './pages/UserDetail';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/account" element={user ? <Account /> : <Login />} />
        <Route path="/add" element={user ? <Add /> : <Login />} />
        <Route path="/call" element={user ? <Call /> : <Login />} />
        <Route path="/chat" element={user ? <Chat /> : <Login />} />
        <Route path="/connections" element={user ? <Connections /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/saved" element={user ? <Saved /> : <Login />} />
        <Route path="/search" element={user ? <Search /> : <Login />} />
        <Route path="/setup" element={user ? <Setup /> : <Login />} />
        <Route path="/u" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
