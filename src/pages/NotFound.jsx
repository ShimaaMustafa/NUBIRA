import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3e5ff] text-[#5e2ca5] text-center px-4">
      <h1 className="text-[8rem] font-bold animate-bounce">404</h1>
      <p className="text-2xl mt-5">آسف، الصفحة اللي بتدور عليها مش موجودة!</p>
      <Link
        to="/"
        className="mt-8 bg-[#9b59b6] hover:bg-[#7d3c98] text-white py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
      >
        الرجوع للصفحة الرئيسية
      </Link>
    </div>
  )
}
