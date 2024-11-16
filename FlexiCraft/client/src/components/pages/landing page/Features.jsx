import { features } from "../../../constants"
import React, { useContext,useEffect } from 'react';
import { RefContext } from '../../RefContext';

const Features = () => {
  const { featuresRef } = useContext(RefContext);
  useEffect(() => {
    if (featuresRef.current) {
      console.log('Features ref set:', featuresRef.current);
    }
  }, [featuresRef]);
  return (
    <div ref={featuresRef} className="relative mt-10 border-b border-neutral-800 min-h-[700px]">
      <div className="text-center">
        <span className="text-xl bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">Features</span>       
        <h2 className="text-3xl mt-10 sm:text-4xl lg:text-6xl tracking-wide">
          Easily build {}
        <span className="bg-gradient-to-r from-purple-500 to-purple-900 text-transparent bg-clip-text font-semibold">
            your code
        </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10">
        {features.map((feature,index)=>(
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 text-purple-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>  
    </div>
    
  )
}

export default Features