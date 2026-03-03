import React from 'react';
import signphoto from '../assets/undraw_authentication_1evl.svg'
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='min-h-screen flex justify-around items-center bg-linear-to-bl from-[#980ffa] via-[#8742d6] to-[#bdaae6] '>
    <img src={signphoto} alt="Sign in illustration" className='w-1/3 h-1/3' />
    <div className='px-5 py-8 w-125 ms-2 bg-white rounded-lg shadow dark:bg-slate-800'>
        <Outlet/>
        </div>
    </div>
  )
}
