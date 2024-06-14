import React from 'react';
import img from 'assets/hero_Image1.jpg'
import img2 from 'assets/hero_image2.jpg'
import img3 from 'assets/Get-fit-Logo.png'

import TestimonialCard from './TestimonialCard';

const CardList = () => {
  const cards = [
    {
      image: img,
      title: "Kiran",
      text: "I have been following this routine and became healthier by doing lorem ipsum proin gravida nibh vel velit auctor aliquet aenean.",
    },
    {
      image: img2,
      title: "David",
      text: "I Highly recommend this program. It has drastically changed my looks",
    },
    {
      image: img3,
      title: "Jessica Simon",
      text: "Worth  it.",
    },
  ];

  return (
    <div className="px-2 py-4 w-full h-full">
      {cards.map((card) => (
        <TestimonialCard
          key={card.title}
          image={card.image}
          title={card.title}
          text={card.text}
        />
      ))}
    </div>
  );
};

export default CardList