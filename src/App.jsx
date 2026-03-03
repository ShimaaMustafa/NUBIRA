import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {HeroUIProvider, ToastProvider} from "@heroui/react";
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PostDetails from './pages/PostDetails';
import Feed from './pages/Feed';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import ProtectedAuthRoute from '../src/protectedRoutes/ProtectedAuthRoute';
import AuthContextProvider from './contexts/authContext';
import CounterContextProvider from './contexts/counterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';




const router = createBrowserRouter([
  {
    path: '' , element: <MainLayout/> , children: [
      {index:true , element: <ProtectedRoute><Feed/></ProtectedRoute>},
      {path: 'profile' , element:<ProtectedRoute> <Profile/></ProtectedRoute>},
      {path: 'posts/:postId' , element: <ProtectedRoute> <PostDetails/> </ProtectedRoute> },
      {path: '*' , element: <NotFound/>},
    ]
  },
  {
    path: '' , element: <AuthLayout/> , children: [
      {path: 'signin' , element: <ProtectedAuthRoute><SignIn/></ProtectedAuthRoute>},
      {path: 'signup' , element: <ProtectedAuthRoute><SignUp/></ProtectedAuthRoute>},
    ]
  }
])

export const queryClient = new QueryClient();
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <AuthContextProvider>
      <CounterContextProvider>
      <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router}/>
      </HeroUIProvider>
      </CounterContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    
    </>
  )
}

export default App
