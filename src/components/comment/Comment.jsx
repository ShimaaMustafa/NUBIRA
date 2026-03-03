import { authContext } from '../../contexts/authContext';
import { useContext } from 'react';
import avatar from '/src/assets/User-avatar.svg.png'
import { Input } from '@heroui/react';
import { useState } from 'react';
import { apiServices } from '../../services/apis';
import { queryClient } from '../../App';
import { useEffect } from 'react';




export default function Comment({ comment, deleteComment, postCreatorId, refreshPosts }) {
    const {userData} = useContext(authContext)
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [commentContent, setCommentContent] = useState(comment.content)
    const [isUpdating, setIsUpdating] = useState(false)
    const [, forceUpdate] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
        forceUpdate(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
}, []);

    function formatTimeAgo(dateString) {
    const now = new Date();
    const commentDate = new Date(dateString);
    const seconds = Math.floor((now - commentDate) / 1000);

    const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    ];

    for (let interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
    }
        return "Just now";
}

    async function updateComment() {
        setIsUpdating(true)
        const formData = new FormData()
        formData.set('content', commentContent)
        const response = await apiServices.updateComment(comment.post, comment._id, formData)
        if(response.status === 200) {
            comment.content = commentContent;
            await queryClient.invalidateQueries(['posts'])
            setIsInEditMode(false)
        }
        setIsUpdating(false)
    }
    
// async function toggleLike() {
//     try {
//         await apiServices.likeComment(comment.post, comment._id);
//         if (refreshPosts) {
//             await refreshPosts(); // هيرفرش البوستس عشان يشوف اللايك الجديد
//         }
//     } catch (error) {
//         console.log("Error liking comment:", error);
//     }
// }
    return (
        <div className="media flex pb-4">
            <a className="mr-4" href="#">
                <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12" src={comment.commentCreator.photo} />
            </a>
            <div className="media-body grow">
                <div className='flex justify-between w-full'>
                    <div>
                    <a className="inline-block text-base font-bold mr-2" href="#">{comment.commentCreator.name}</a>
                    <span className="text-slate-500 dark:text-slate-300">{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                    <div className='flex gap-2'>
                        {(userData?._id == comment?.commentCreator?._id ) && 
                    <button onClick={() =>setIsInEditMode(true)} className="text-sm me-3 text-default-500 hover:text-default-700 transition duration-200">
                        Edit
                    </button>}
                    {(userData?._id == comment?.commentCreator?._id || userData?._id == postCreatorId) && 
                    <button onClick={() => deleteComment(comment._id)} className="text-sm text-red-500 hover:text-red-700 transition duration-200">
                        Delete
                    </button>}
                    </div>
                    
                </div>
                {
                    isInEditMode ? 
                    <div>
                        <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                        <div className='flex gap-2 justify-end mt-2'>
                            <button onClick={() => {setIsInEditMode(false); setCommentContent(comment.content)}} className="text-sm text-red-500 hover:text-red-700 transition duration-200">
                            Cancel
                        </button>
                            <button isLoading={isUpdating} onClick={() => updateComment()} className="text-sm text-purple-500 hover:text-purple-700 transition duration-200">
                            Save
                        </button>
                        </div>
                    </div>
                    
                    :
                    comment.content && <p>{comment.content}</p>
                }
                {comment.image && (<img src={comment.image} alt="comment" className="mt-2 rounded-lg max-h-60 object-cover" />)}
                <div className="mt-2 flex items-center">
                    <a className="inline-flex items-center py-2 mr-3 cursor-pointer">
                        <span className="mr-2 cursor-pointer">
                            <svg className="fill-rose-600 dark:fill-rose-400" style={{ width: 22, height: 22 }} viewBox="0 0 24 24">
                                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                </path>
                            </svg>
                        </span>
                        <span className="text-base font-bold"> {comment.likesCount || 0}</span>
                    </a>
                    <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    )
}
