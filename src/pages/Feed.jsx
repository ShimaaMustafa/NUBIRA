import Post from '../components/post/Post';
import LoadingScreen from '../components/LoadingScreen';
import { apiServices } from '../services/apis';
import CreatePost from '../components/CreatePost';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@heroui/react';


export default function Feed() {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/signin");
  //   }
  // }, [token, navigate]);

  const { data: posts=[], isLoading, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => apiServices.getPosts(),
    select: (data) => data.data.data.posts,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 15,
  })


  return (
    <div className='max-w-xl mx-auto py-10 grid gap-6'>
      {
      isFetching && !isLoading 
      && <div className='bg-transparent w-fit rounded-full fixed start-1/2 -translate-x-1/2'>
      <Spinner/>
      </div>
      }
    <CreatePost />
    {
      isLoading ?
      <LoadingScreen /> 
      :
      posts.map((post) => <Post post={post} key={post._id} />)
    }
    </div>
  )
}
