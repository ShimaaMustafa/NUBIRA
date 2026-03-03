import { Spinner } from '@heroui/react';
import { useState } from 'react';
import { queryClient } from '../../App';

export default function CreateCommentInput({ addComment }) {
    const [commentContent, setCommentContent] = useState("")
    const [commentImage, setCommentImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleImageChange(e) {
    if (e.target.files[0]) {
        setCommentImage(e.target.files[0])
        const imgSrc = URL.createObjectURL(e.target.files[0])
        setImagePreview(imgSrc)
    }
}
    
    async function handleCreateComment() {
        
        const formData = new FormData()
        formData.set("content", commentContent)
        if (commentImage){
            formData.set('image', commentImage)
        }
        for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
}
        await addComment(formData)
        setCommentContent("")
        removeImage()
        queryClient.invalidateQueries(['posts'])
    }

    function removeImage() {
    setCommentImage(null)
    setImagePreview(null)
    document.getElementById("commentImageInput").value = null
}

    return (
        <div>
        <div className="relative">
            <input disabled={isLoading} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" />
            <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
            <label className="cursor-pointer text-gray-600 hover:text-purple-600 transition duration-200">
                <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="commentImageInput"
                
            />
                <svg className="mr-2" style={{ width: 20, height: 20 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z">
                </path>
                </svg>
            </label>
                
                <button onClick={handleCreateComment} disabled={isLoading || commentContent.trim() == ""} className="disabled:cursor-not-allowed text-sm text-purple-500 hover:text-purple-700 transition duration-200" >
                    <svg className="fill-purple-500 dark:fill-slate-50" style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                </button>
            </span>
        </div>
        {imagePreview && (
                <div className="mt-2 relative w-fit">
                    <img src={imagePreview} className="h-20 rounded-md" />
                    <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                    </button>
                </div>
            )}
            </div>
    )
}
