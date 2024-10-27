import { testimonials } from "../../../constants";
import React, { useContext } from 'react';
import { RefContext } from '../../RefContext';

const Testimonials = () => {
  const { testimonialsRef } = useContext(RefContext);
  return (
    <div ref={testimonialsRef} className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-row overflow-x-scroll no-scrollbar">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="item w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className=" bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p className="h-[150px]">{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
