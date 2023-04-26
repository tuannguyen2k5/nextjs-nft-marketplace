import React from "react";
import Slider from "react-slick";
import "@/node_modules/slick-carousel/slick/slick.css"; 
import "@/node_modules/slick-carousel/slick/slick-theme.css";

const Collection = () => {
  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/800/600?random=1',
      title: 'Slide 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu velit vel tortor interdum auctor. Donec in nunc ullamcorper, feugiat enim ac, fermentum purus.',
    },
    {
      id: 2,
      image: 'https://picsum.photos/800/600?random=2',
      title: 'Slide 2',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      id: 3,
      image: 'https://picsum.photos/800/600?random=3',
      title: 'Slide 3',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    },
    {
      id: 4,
      image: 'https://picsum.photos/800/600?random=4',
      title: 'Slide 4',
      description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    },
    {
      id: 5,
      image: 'https://picsum.photos/800/600?random=5',
      title: 'Slide 5',
      description: 'Aliquam erat volutpat. Nulla facilisi. Duis ac nisi in ante congue porttitor. Morbi mollis sapien ac mauris laoreet, eu ullamcorper magna sollicitudin.',
    },
    {
      id: 6,
      image: 'https://picsum.photos/800/600?random=6',
      title: 'Slide 6',
      description: 'Integer eu diam eget diam commodo luctus. Etiam laoreet, nunc at ultricies tempus, velit velit aliquam mauris, sit amet facilisis metus elit ut augue.',
    },
  ];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  
  return (
    <div className="my-10">
      <h2 className="text-center"> Collections </h2>
      <Slider {...settings}>
      {slides.map((slide) => (
            <div key={slide.id}>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{slide.title}</div>
                <p className="text-gray-700 text-base">{slide.description}</p>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default Collection;
