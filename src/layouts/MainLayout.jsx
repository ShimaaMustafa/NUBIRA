import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import { authContext } from '../contexts/authContext';


export default function MainLayout() {
  const { isLoading } = useContext(authContext)
  return (
    <div className='bg-[#f2e4fc] dark:bg-slate-800'>
    <Navbar/>
    {isLoading ? <LoadingScreen /> : <Outlet />}
    </div>
  )
}
