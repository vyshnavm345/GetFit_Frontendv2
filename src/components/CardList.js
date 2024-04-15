import React from 'react';
import img from 'assets/hero_Image1.jpg'
import TestimonialCard from './TestimonialCard';

const CardList = () => {
  const cards = [
    {
      image: img,
      title: "Jessica Simon",
      text: "I have been following this routine and became healthier by doing lorem ipsum proin gravida nibh vel velit auctor aliquet aenean.",
    },
    {
      image: img,
      title: "Jessica Simon",
      text: "I have been following this routine and became healthier by doing lorem ipsum proin gravida nibh vel velit auctor aliquet aenean.",
    },
    {
      image: img,
      title: "Jessica Simon",
      text: "I have been following this routine and became healthier by doing lorem ipsum proin gravida nibh vel velit auctor aliquet aenean.",
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