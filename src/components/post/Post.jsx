import { useState } from "react"
import { apiServices } from "../../services/apis"
import Comment from "../comment/Comment"
import CreateCommentInput from "../comment/CreateCommentInput"
import ShowMoreBtn from "../comment/ShowMoreBtn"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import { queryClient } from "../../App"
import { Navigate, useLocation, useNavigate } from "react-router-dom"


export default function Post({ post, comments, getPosts , getUserPosts, refreshPosts}) {

    const [isEditing, setIsEditing] = useState(false)
    const [caption, setCaption] = useState(post.body)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(post.image)
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();


    function refreshPosts() {
    if (getPosts) return getPosts();
    if (getUserPosts) return getUserPosts();
}

    async function addComment(formData) {
        const response = await apiServices.createComment(post._id, formData)
        if (response.success) {
            console.log(response);
            if (refreshPosts) {
            await refreshPosts();
            }
            // queryClient.invalidateQueries(['posts'])
        }
    }

    async function deletePost() {
        const response = await apiServices.deletePost(post._id)
        if (response.success) {
            console.log(response);
            // getPosts()
            queryClient.invalidateQueries(['posts'])
            if (location.pathname.includes('/post/')) {
            navigate('/');
        }else if (location.pathname.includes('/profile')) {
            getUserPosts();
        }
        }
    }

    async function deleteComment(commentId) {
        const response = await apiServices.deleteComment(post._id, commentId)
        if (response.success) {
            console.log(response);
            if (refreshPosts) {
                await refreshPosts();
            }
            // queryClient.invalidateQueries(['posts'])
        }
    }

    async function handleUpdate(e) {
    e.preventDefault()
    setLoading(true)

    try {
    const formData = new FormData()

    if (caption) {
    formData.set("body", caption)
    }

    if (image) {
    formData.set("image", image)
    }

    const response = await apiServices.updatePost(post._id, formData)
    const data = response.data 

    if (data?.success) {
        if (refreshPosts) {
            await refreshPosts();
        }
    // queryClient.invalidateQueries(['posts'])
    setIsEditing(false)
    }

    } catch (error) {
    console.log(error)
    } finally {
    setLoading(false)
    }
}

    return (
        post && <article className="mb-4 break-inside p-6 rounded-xl bg-white shadow dark:bg-slate-700 flex flex-col bg-clip-border">
            <PostHeader userName={post.user.name} userPhoto={post.user.photo} createdAt={post.createdAt} deletePost={deletePost} creatorId={post.user._id} updatePost={() => setIsEditing(true)} />
            {
    isEditing ? (
    <form onSubmit={handleUpdate} className="space-y-3 my-4">

    <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full px-4 py-3  focus:border-purple-600 border-2 border-gray-300 rounded-lg resize-none"
        rows="3"
    />

    {imagePreview && (
        <div className="relative">
        <img
            src={imagePreview}
            className="w-full max-h-64 object-cover rounded-lg"
        />
        </div>
    )}
    <div className="flex justify-between items-center">
    <label
    htmlFor="imageInput"
    className="cursor-pointer text-gray-600 hover:text-purple-600 transition duration-200 flex items-center space-x-2"
>
    <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
    <span className="text-sm font-medium">Photo</span>
    <input
        type="file"
        accept="image/*"
        id="imageInput"
        className="hidden"
        onChange={(e) => {
            setImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }}
        disabled={loading}
    />
    </label>
    
    <div className="flex gap-3 justify-end">
        <button
        type="button"
        onClick={() => {
            setIsEditing(false)
            setCaption(post.body)
            setImage(null)
            setImagePreview(post.image)
        }}
        disabled={loading}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
        >
        Cancel
        </button>
        <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded-md"
        >
        {loading ? "Editing..." : "Edit"}
        </button>
    </div>
    </div>
    


    </form>
    ) : (
    <PostBody caption={post.body} image={post.image} />
    )
}
            {/* <PostBody caption={post.body} image={post.image} /> */}
            <PostFooter commentsCount={post.commentsCount} likesCount={post.likesCount} postId={post._id} refreshPosts={refreshPosts} />
            <CreateCommentInput addComment={addComment} postId={post._id} />
            <div className="pt-6">
                {
                    comments ? comments.map((comment) => <Comment key={comment._id} comment={comment} deleteComment={deleteComment} postCreatorId={post.user._id} refreshPosts={refreshPosts} />)
                        :
                        post.topComment && <Comment comment={post.topComment}  deleteComment={deleteComment} postCreatorId={post.user._id} />
                }
            </div>
            {!comments && <ShowMoreBtn postId={post._id} />}
        </article>
            
    )
}
