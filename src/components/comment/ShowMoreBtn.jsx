import React from 'react'
import { Link } from 'react-router-dom'

export default function ShowMoreBtn({ postId }) {
    return (
        <div className="w-full">
            <Link to={"/posts/" + postId} className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
                more comments</Link>
        </div>
    )
}
