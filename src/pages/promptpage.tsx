import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TPP: React.FC = () => {



  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate()


  const handlebuildsite=()=>{

    const roomId = "123456"
    const username = "User"

    navigate(`/editor/${roomId}`, {
        state: {
            username,
            //htmlcontent : sampleoutput
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
