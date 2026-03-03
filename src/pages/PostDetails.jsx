import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/post/Post'
import LoadingScreen from '../components/LoadingScreen'
import { apiServices } from '../services/apis'
import NotFound from './NotFound'

export default function PostDetails() {
  let { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusCode, setStatusCode] = useState(null)
  async function getPostDetails() {
    try {
    const  {data}  = await apiServices.getPostDetails(postId)
    setPost(data.post);
  } catch(error){
      setStatusCode(error.status)
  } finally{
    setIsLoading(false)
  }
}

  async function getPostComments(){
    const {data} = await apiServices.getPostComments(postId)
    setComments(data.comments);
  }

  useEffect(() => {
    getPostDetailsAndComment()
  }, [])

  function getPostDetailsAndComment() {
    getPostDetails()
    getPostComments()
  }
  
  return (
    <div className='max-w-xl mx-auto py-10 grid gap-6'>
      {
        isLoading ? <LoadingScreen /> :
        statusCode == 404 ? <NotFound/> :
      <Post post={post} comments={comments} getPosts={getPostDetailsAndComment} />}
    </div>
  )
}
