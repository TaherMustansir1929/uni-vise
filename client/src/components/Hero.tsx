import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Spotlight } from "./ui/Spotlight";
import AudioVisualizer from "./AudioVisualizer";
import { useState, useRef, useEffect } from "react";

export const Hero = () => {
  const [audio, setaudio] = useState(false);

  const handleAudio = () =>{
    setaudio((prev)=>!prev);
  }

  return (
    <section className="min-h-[95vh] flex flex-col items-center justify-center px-4 hero-gradient">
      {/* AUDIO VISUALIZER */}
      <div className="fixed top-0 right-0 z-30 flex items-center justify-start">
        <AudioVisualizer playAudio={audio} />
      </div>
      <Spotlight
        className="-top-52 left-0 md:left-60 md:-top-20"
        fill="rgba(88, 50, 168, 0.5)"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full inline-block mb-4">
          Find Your Path
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Your Future Begins with <br /> the{" "}
          <span className="text-[#a887ed] text-gradient">Right Choice</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the perfect university and career path tailored to your
          academic profile and aspirations in Pakistan.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pt-4 flex flex-col justify-center items-center gap-3"
        >
        <span className="text-xs text-gray-500">{`<click here to begin your journey/>`}</span>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            onClick={() =>
              document
                .getElementById("result-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className=" relative overflow-hidden flex gap-1 hover:gap-3 transition-all duration-0.3 items-center w-full"
            onClick={()=>{handleAudio()}}>
                Get Started
                <MoveRight />
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
