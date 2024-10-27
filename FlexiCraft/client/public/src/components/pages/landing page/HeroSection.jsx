import video from "../../../assets/video.mp4";
import React from 'react';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-4xl lg:text-6xl text-center tracking-wide">
       Turn Text into Stunning Websites with {}
       <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text font-bold">
          AI Precision
       </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Empower Your Web Development with AI-Driven Templates and Real-Time Collaboration
      </p>
      <div className="justify-center items-center space-x-10 my-10">
        <a href="#" className="mt-5 py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-900">Get Started for Free</a>
        <Link to="/documentation">
          <button className="mt-5 py-2 px-3 rounded-md border">Documentation</button>
        </Link>
      </div>
      <div className="flex justify-center ">
        <video autoPlay loop muted className="rounded-lg mx-20 my-10 border border-neutral-700 w-full">
          <source src={video} type="video/mp4"/>
          video not supported
        </video>
      </div>
    </div>
  )
}

export default HeroSection