import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='flex items-center justify-center min-h-[70vh]'>
      <Spinner color="current" />
    </div>
  )
}

