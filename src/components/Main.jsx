// import React, { useState } from 'react'

import img1 from '../assets/heroImage.jpg'
// import img4 from '../assets/hero_Image1.jpg'
import img4 from 'assets/hero_image2.jpg'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    // const [image, setImage] = useState([])
    const navigate = useNavigate()
  return (
    <div className='w-full h-[650px] text-white '>
        <div className='w-full h-full '>
          <div className='absolute w-full h-[650px] bg-gradient-to-r from-black xl:h-[712px]'></div>
        <img className='w-full h-full object-cover ' src={img1} alt="" />
        <div className='absolute  top-[325px] transform -translate-y-1/2 sm:left-[400px] md:left-[500px] lg:left-[650px] xl:left-[750px] lg:object-contain self-end'>
          <img src={img4} alt="hero" className='w-full h-[650px] self-end md:self-end object-cover' />
        </div>
        <div className='top-[50%] absolute w-full sm:top-[28%] md:top-[30%] p-4 md:p-4 md:pl-10 lg:pl-10 ' >
          <h1 className='text-3xl md:text-5xl lg:text-7xl font-blackops-one'>Discover Your Fitness<br/> Journey with Us</h1>
          <p className='text-sm md:text-md md:mt-2 lg:text-3xl'>Join our community of like-minded individuals and achieve your <br/> fitness goals with the help of expert trainers.</p>
          <div className='my-4 ml-1 md:ml-16'>
            <button onClick={()=>(navigate('/register'))} className='border rounded bg-gray-300 text-black border-gray-300 py-2 px-5'>Get Started</button>
            <button className='border rounded text-white border-gray-300 py-2 px-5 ml-4 '>Learn More</button>
          </div>
        
        </div>
        </div>
    </div>
  )
}

export default Main
