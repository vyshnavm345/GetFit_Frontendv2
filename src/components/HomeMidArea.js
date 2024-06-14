import React from 'react'
import teamimg from 'assets/Homepage/we_are_kaged.webp'

const HomeMidArea = () => {
  return (
    <div className="bg-[#ebebeb] mx-auto  py-16 px-4">
      <div className="lg:flex lg:items-center">
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">OUR STORY</h1>
          <p className="text-gray-700 p-5 leading-loose">
            We Are the Get-fit Family
            <br />
            Kaged was born of a need for premium, health-focused products that
            actually work. We help you lift heavier, run faster, live healthier,
            and achieve your potential.
            <br />
            From the beginning in 2015, we saw a problem: a lack of sports
            nutrition products that demanded high-quality, clean ingredients in
            efficacious doses that helped people get real-world results. We
            developed our flagship products in response to this, in line with
            our core tenets of transparency, innovation, and constant growth.
          </p>
          <p className="text-gray-700 p-5 leading-loose">
            Since then, we've lived by our mantra to never stop evolving. We
            continue to innovate with new products based on the latest science
            and cutting edge ingredients to provide you with everything you need
            to perform your absolute best, without ever losing sight of your
            health.
          </p>
          <button className="ml-5 bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded mt-4">
            READ MORE
          </button>
        </div>
        <div className="lg:w-1/2 hidden lg:block">
          {/* Add your image here */}
          <img
            src={teamimg}
            alt="Image Description"
            className="w-full h-[500px] object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeMidArea