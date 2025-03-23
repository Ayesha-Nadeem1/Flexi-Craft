import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TPP: React.FC = () => {

  const sampleoutput=`<!DOCTYPE html>
  <html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <div class="flex flex-col min-h-screen">
      <div class="relative flex flex-col-reverse py-12 lg:py-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-col items-center text-center lg:flex-row lg:text-left">
            <div class="flex-1">
              <h1 class="text-4xl font-bold leading-none mb-10 text-gray-900 lg:text-5xl">Fashion Brand</h1>
            </div>
            <div class="flex-1 lg:flex-grow-0 lg:pl-20">
              <p class="text-lg text-gray-600 leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between flex-wrap p-6">
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded hover:text-gray-100 hover:border-gray-400">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Home</a>
              <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">About</a>
              <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-gray-900 mr-4">Contact</a>
            </div>
            <div>
              <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-100 border-gray-400 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-100 mt-4 lg:mt-0">Shop Now</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/3">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full h-64" src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sunset in the mountains">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-bold text-gray-900">Collection A</h2>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full h-64" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Rainforest">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-bold text-gray-900">Collection B</h2>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/3">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full h-64" src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="River">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-bold text-gray-900">Collection C</h2>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#fashion</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#style</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 pb-12 lg:pb-24">
        <footer class="flex flex-wrap items-center justify-between border-t border-gray-200 pt-6">
          <div class="w-full lg:w-1/2">
            <p class="text-gray-600">Copyright © 2021 Fashion Brand. All Rights Reserved.</p>
          </div>
          <div class="w-full lg:w-1/2 text-right">
            <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Privacy Policy</a>
            <a href="#" class="text-gray-600 hover:text-gray-900 mr-4">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  </body>
  </html>`;


  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate()


  const handlebuildsite=()=>{

    const roomId = "123456"
    const username = "User"

    navigate(`/editor/${roomId}`, {
        state: {
            username,
            htmlcontent : sampleoutput
        },
    });

    //pass the sample model output code to editor and display it as editable

  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-black text-white overflow-hidden px-4">
      {/* Animated Heading */}
      <h1
        className="absolute top-32 md:top-28 sm:top-24 xs:top-16 text-7xl md:text-6xl sm:text-5xl xs:text-3xl font-bold text-white select-none text-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,1), rgba(255,255,255,0.3))",
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "pulse-gradient 3s infinite linear",
        }}
      >
        Text to Website Template Generation
      </h1>

      <style>
        {`
          @keyframes pulse-gradient {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          @keyframes card-gradient {
            0% { background-position: 100% 0; }
            100% { background-position: 0 100%; }
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full"
        initial={{ scale: 0.5, x: -200, y: -200 }}
        animate={{ scale: 1.5, x: 200, y: 200 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-700 opacity-25 blur-2xl rounded-full"
        initial={{ scale: 1, x: 150, y: 150 }}
        animate={{ scale: 1.3, x: -150, y: -150 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />
     <motion.div
        className="absolute w-96 h-96 bg-blue-900 opacity-20 blur-3xl rounded-full"
        initial={{ scale: 0.5, x: -200, y: -200 }}
        animate={{ scale: 1.5, x: 200, y: 200 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-1100 opacity-25 blur-2xl rounded-full"
        initial={{ scale: 1, x: 150, y: 150 }}
        animate={{ scale: 1.3, x: -150, y: -150 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Responsive Card Container */}
      <Card
  className="w-full max-w-2xl p-6 bg-gray-900 rounded-2xl border border-blue-500 relative z-10 mt-40 md:mt-32 sm:mt-28 xs:mt-20"
>
  <CardContent className="flex flex-col gap-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Input
        className="w-full p-4 text-white text-lg bg-gray-800 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Describe your template idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </motion.div>
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 p-4 rounded-lg"
        onClick={handlebuildsite}
      >
        <Sparkles className="w-5 h-5" /> Build your site
      </Button>
    </motion.div>
  </CardContent>
</Card>

    {/* 🔥 New Button Below the Card 🔥 */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="mt-6 w-full max-w-2xl"
    >
    </motion.div>

    <div className="absolute top-4 left-4">
    <Button
      className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 p-4 rounded-lg"
      onClick={() => navigate("/")}
    >
      🚀 Create Room
    </Button>
  </div>

    </div>
  );
}

export default TPP; 
