import React from 'react'
import backgroundImage from "assets/Homepage/Los_Angeles_Elite_Shoot_-_Day_1_-_Tawna_McCoy_Davey_Fisher_-_9-1801x1201-075bc60_837d421a-f1b0-4481-986f-99f66f5b36c2.webp";
import trainerBanner from 'assets/Homepage/Trainer-Banner-a.webp'

const HomeTopArea = () => {
  return (
    <>
      <div className="my-3 mx-auto text-black font-extrabold text-5xl text-center items-center uppercase">
        Begin your fitness journey today
      </div>
      <div
        className=" h-[550px] object- flex flex-col justify-end items-start bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(24, 24, 24, 0), rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.3) 100%), url(${backgroundImage})`,
          backgroundSize: "cover", // Add this line
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col space-y-4 text-left mb-16 ml-16 text-white">
          <h1 className="text-3xl font-bold">Transformation Starts Here</h1>
          <p className="text-xl">
            Select from a dozen online training programs designed to kickstart
            your transformation.
          </p>
          <button className="font-extrabold text-sm px-4 w-48 py-2 bg-white text-black  rounded-md hover:bg-white/80">
            START A PROGRAM
          </button>
        </div>
      </div>
      <div
        className="my-10 h-[550px] object- flex flex-col justify-end items-start bg-cover bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(24, 24, 24, 0), rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.3) 100%), url(${trainerBanner})`,
          backgroundSize: "cover", // Add this line
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col space-y-4 text-left mb-52 ml-16 text-white">
          <h1 className="text-3xl font-bold">Transformation Starts Here</h1>
          <p className="text-xl">
            It's Time To{" "}
            <strong className="font-extrabold text-4xl">
              Transform Your Life{" "}
            </strong>{" "}
            At Kaged, we're more than just powders and pills. We're about
            helping you become the best version of yourself in and out of the
            gym. Use one of our Training programs below to kick start your
            routine and transform your life.
          </p>
          <button className=" font-bold text-lg px-4 w-48 py-2 bg-black text-white rounded-md hover:bg-black/80">
            Get started
          </button>
        </div>
      </div>
      {/* <div className="container mx-auto py-16 px-4">
        <div className="lg:flex lg:items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <img
              src="your-image.jpg"
              alt="Image Description"
              className="w-full h-auto object-cover rounded"
            />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">OUR STORY</h1>
            <p className="text-gray-700 leading-loose">
              We Are Kaged
              <br />
              Kaged was born of a need for premium, health-focused products that
              actually work. We help you lift heavier, run faster, live
              healthier, and achieve your potential.
              <br />
              From the beginning in 2015, we saw a problem: a lack of sports
              nutrition products that demanded high-quality, clean ingredients
              in efficacious doses that helped people get real-world results. We
              developed our flagship products in response to this, in line with
              our core tenets of transparency, innovation, and constant growth.
            </p>
            <p className="text-gray-700 leading-loose">
              Since then, we've lived by our mantra to never stop evolving. We
              continue to innovate with new products based on the latest science
              and cutting edge ingredients to provide you with everything you
              need to perform your absolute best, without ever losing sight of
              your health.
            </p>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4">
              READ MORE
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default HomeTopArea