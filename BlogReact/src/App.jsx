import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth'; // Fixed import
import { login, logout } from "./store/authSlice";
import {Header , Footer} from './components'; 


import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); // Fixed object structure
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]); // Added dependency

  return !loading ? (
    <div className='min-h-screen flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header />
        <main>
          TODO : {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
