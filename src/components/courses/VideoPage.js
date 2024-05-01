import React from 'react';
// import Tailwind from 'tailwindcss/tailwind.css';

const VideoPage = ({video_url}) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-6xl font-blackops-one my-5">
        Effective Ways of Building Stamina
      </h1>
      <div className="flex flex-col">
        <div className="w-full aspect-w-16 aspect-h-9">
          <iframe
            // className="w-full h-full"
            src={`https://www.youtube.com/embed/${
              video_url?.split("v=")[1].split("&")[0]
            }`}
            title="YouTube video player"
            frameborder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="flex-1  py-4 md:py-8">
          <h1 className="text-3xl font-bold leading-tight mb-4">
            Effective Ways of Building Stamina
          </h1>
          <p className="text-gray-700 leading-loose">
            Description text here. You can add more content here to describe the
            video and provide additional information.
          </p>
          <button className="btn btn-primary mt-4">Choose your video</button>
          <button className="btn btn-outline mt-4">Customize</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
