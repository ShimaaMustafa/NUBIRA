import { useContext, useEffect, useState } from 'react';
import ChangePassword from '../components/password/ChangePassword';
import { authContext } from '../contexts/authContext';
import Post from '../components/post/Post';
import { apiServices } from '../services/apis';
import {Button, Spinner} from "@heroui/react";
import { Link } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import LoadingScreen from '../components/LoadingScreen';

export default function Profile() {
const { userData } = useContext(authContext)
const [posts, setPosts] = useState([])
const [isLoading, setIsLoading] = useState(false);
const [isFetching, setIsFetching] = useState(false);


  async function getUserPosts() {
  setIsFetching(true);
  const { data } = await apiServices.getUserPosts(userData._id)
  setPosts(data.posts)
  setIsFetching(false);

}

  useEffect(() => {
    if (userData?._id) {
      getUserPosts()
    }
  }, [userData])




  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-4">
      {
      isFetching && !isLoading 
      && <div className='bg-transparent w-fit rounded-full fixed start-1/2 -translate-x-1/2'>
      <Spinner/>
      </div>
      }
    
      {/* LEFT SIDE */}
      <div className="col-span-1 space-y-6 sticky top-6 h-fit">
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          {/* Change Password */}
          <div className="mb-4">
          <ChangePassword/>
        </div>
        </div>
      </div>

      {/* center SIDE */}
      <div className="col-span-2 ">
        <CreatePost getUserPosts={getUserPosts}/>

          {posts.length === 0 ? <div className='justify-center items-center flex'>
            <p className='text-center text-3xl text-gray-500 mt-10 p-6 w-[50%] '>No posts yet. Create your first post! </p>
          </div> : (
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                getUserPosts={getUserPosts}
              />
            ))
          )}
        </div>

      {/* RIGHT SIDE */}
        <div className="col-span-1 space-y-6 sticky top-6 h-fit">
        {/* User Info */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <p className="text-sm text-gray-600">Name: {userData?.name}</p>
          <p className="text-sm text-gray-600">Email: {userData?.email}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow h-fit">
        <div className="flex flex-col gap-4 items-center">
            <Link to="/" className='w-27'><Button variant="ghost" color="secondary" className='text-purple-800 font-medium w-full'>Home</Button></Link>
            <Link to="/" className='w-27'><Button variant="ghost" color="secondary" className='text-purple-800 font-medium w-full'>Messages</Button></Link>
            <Link to="/" className='w-27'><Button variant="ghost" color="secondary" className='text-purple-800 font-medium w-full'>Settings</Button></Link>
            <Link to="/signin" className='w-27'><Button variant="ghost" color="secondary" className='text-purple-800 font-medium w-full'>LogOut</Button></Link>
          </div>
          </div>
      </div>
      </div>

  )
}
