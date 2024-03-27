import React from 'react'

const NotFoundPage = () => {
  return (
    
    <div className='container text-white mt-48'>
        <div class="flex flex-col items-center">
            <div class="text-indigo-500 font-bold text-7xl">
                404
            </div>

            <div class="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                This page does not exist
            </div>

            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                The page you are looking for could not be found.
            </div>
            <a href="/"
					class="bg-transparent hover:bg-blue-300 text-blue-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 mt-4 border border-blue-300 hover:border-transparent">
					Go Back</a>
        </div>
    </div>
  )
}

export default NotFoundPage