import React from 'react'

export default function PostBody({ caption, image }) {
    return (
        <>
            {
                caption && <h2 className="text-xl font-medium dark:text-white">
                    {caption}
                </h2>
            }
            {
                image && <div className="py-4">
                    <img className="max-w-full mx-auto rounded-lg" src={image} />
                </div>
            }
        </>

    )
}
