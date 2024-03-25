import React from 'react'
import logo from '../assets/Get-fit-Logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleDropdownChange = (e)=>{
    const selectedOption = e.target.value;
    if (selectedOption === 'option1') {
      navigate('/login')
    }
    else if(selectedOption === 'option2'){
      navigate('/register')
    }
  }

  return (
    <div className='flex items-center justify-between p-4 w-full z-[100] absolute'>
  <Link to='/'>
    <div className='flex items-center'>
      <img className='h-12 md:h-10 mr-2' src={logo} alt="logo" />
      <h1 className='text-white text-4xl cursor-pointer font-blackops-one md:block hidden'>GET-FIT</h1>
    </div>
  </Link>
  <div className=''>
    <a className='mx-5 font-mono text-white' href="">Find trainers</a>
    <a className='mx-5 font-mono text-white' href="">Programms</a>
    <div className="relative inline-block">
          <select className='mx-5 font-mono  text-white bg-transparent border-none' defaultValue="" onChange={handleDropdownChange}>
            <option className='text-white' value="" disabled hidden>Community</option>
            <option className=' text-black' value="option1"><Link to='/login'>login</Link></option>
            <option className=' text-black' value="option2">Sign up</option>
            <option className=' text-black' value="option3">Option 3</option>
            <option className=' text-black' value="option4">Option 4</option>
          </select>
          <svg className="absolute pointer-events-none top-0 right-0 m-2" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4l2 2 2-2"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
    
  </div>
  
  <div className='xl:mr-32'>
    <Link to='/login'>
      <button className='bg-white rounded-md mr-2 text-sm px-4 py-1 hover:bg-cyan-400'>Log In</button>
    </Link>
    <Link to='/register'>
      <button className='bg-white rounded-md text-sm px-4 py-1  hover:bg-cyan-400'>Sign Up</button>
    </Link>
  </div>
</div>
  )
}

export default Navbar